package com.moodys.atlas.storage.service.impl;

import com.moodys.atlas.common.datamodel.api.CsvFileStructure;
import com.moodys.atlas.common.datamodel.api.Field;
import com.moodys.atlas.common.datamodel.api.FileStructure;
import com.moodys.atlas.storage.domain.DataAsset;
import com.moodys.atlas.storage.domain.DataAssetField;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetStructure;
import com.moodys.atlas.storage.exception.InvalidDataAssetChangeException;
import com.moodys.atlas.storage.exception.InvalidDataAssetFieldsException;
import com.moodys.atlas.storage.exception.InvalidDataAssetStructureException;
import com.moodys.atlas.storage.service.DataAssetService;
import com.moodys.atlas.storage.service.DataAssetValidationService;
import com.moodys.atlas.storage.service.DataConnectorInvokationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DataAssetValidationServiceImpl implements DataAssetValidationService {

  @Autowired
  private DataAssetService dataAssetService;

  @Autowired
  private DataConnectorInvokationService dataConnectorInvokationService;

  private final Set<String> compatabilitySet = new HashSet<String>() {{
    //types that is compatible to string
    add("STRING:STRING");
    add("FLOAT:STRING");
    add("INT:STRING");
    add("DATE:STRING");
    add("AMOUNT:STRING");
    add("PERCENTAGE:STRING");
    //types that is compatible to float
    add("FLOAT:FLOAT");
    add("INT:FLOAT");

    add("INT:INT");
    add("DATE:DATE");
    //TODO: what is the AMOUNT mean?
    add("AMOUNT:AMOUNT");
    add("PERCENTAGE:PERCENTAGE");

  }};

  private void validateStructure(String dataAssetType, DataAssetStructure dataAssetStructure, FileStructure fileStructure) {
    //dataAssetType should be equal to the file structure format
    if (!fileStructure.getFormat().equals(dataAssetType)) {
      throw new InvalidDataAssetStructureException(InvalidDataAssetStructureException.ExceptionTypes.FILE_FORMAT, "The file does not have the same format as the data asset");
    }

    if (fileStructure.getFormat().equals(CsvFileStructure.FORMAT_CSV)) {
      CsvFileStructure csvFileStructure = (CsvFileStructure) fileStructure;

      if (!csvFileStructure.getHasHeaders().equals(dataAssetStructure.getHeader() > 0)) {
        throw new InvalidDataAssetStructureException(InvalidDataAssetStructureException.ExceptionTypes.HAS_HEADER, "The file does not have the same header definition as the data asset");
      }

      if (csvFileStructure.getFieldSeparator() != null && !csvFileStructure.getFieldSeparator().equals(dataAssetStructure.getDelimiter())) {
        throw new InvalidDataAssetStructureException(InvalidDataAssetStructureException.ExceptionTypes.FIELD_SEPARATOR, "The file does not have the same field separator as the data asset");
      }

      if (csvFileStructure.getDecimalSeparator() != null && !csvFileStructure.getDecimalSeparator().equals(dataAssetStructure.getDecimalSeparator())) {
        throw new InvalidDataAssetStructureException(InvalidDataAssetStructureException.ExceptionTypes.DECIMAL_SEPARATOR, "The file does not have the same decimal separator as the data asset");
      }

      if (csvFileStructure.getRecordDelimiter() != null && !csvFileStructure.getRecordDelimiter().equals(dataAssetStructure.getRecordDelimiter())) {
        throw new InvalidDataAssetStructureException(InvalidDataAssetStructureException.ExceptionTypes.RECORD_DELIMITER, "The file does not have the same record delimiter as the data asset");
      }

      if (csvFileStructure.getValueDelimiter() != null && !csvFileStructure.getValueDelimiter().equals(dataAssetStructure.getValueDelimiter())) {
        throw new InvalidDataAssetStructureException(InvalidDataAssetStructureException.ExceptionTypes.VALUE_DELIMITER, "The file does not have the same value delimiter as the data asset");
      }

      if (csvFileStructure.getDateFormat() != null && !csvFileStructure.getDateFormat().equals(dataAssetStructure.getDateFormat())) {
        throw new InvalidDataAssetStructureException(InvalidDataAssetStructureException.ExceptionTypes.DATE_FORMAT, "The file does not have the same date format as the data asset");
      }
    } else {
      //TODO: for parquet and avro
      throw new UnsupportedOperationException("Parquet and avro files are not supported yet");
    }

  }

  private boolean checkDataTypeCompatibility(String dataAssetType, String datasetType) {
    return compatabilitySet.contains(datasetType.toUpperCase() + ":" + dataAssetType.toUpperCase());
  }

  private void validateFields(String dataAssetType, List<DataAssetField> dataAssetFields, Field[] datasetFields) {
    //fields number in DataAsset must be smaller or equal to that of dataset fields
    if (dataAssetFields.size() > datasetFields.length) {
      throw new InvalidDataAssetFieldsException(InvalidDataAssetFieldsException.ExceptionType.FIELDS_NUMBER, "The file has less fields than that in data asset");
    }

    if (dataAssetType.toUpperCase().equals(CsvFileStructure.FORMAT_CSV)) {
      //for a CSV file, order and type matters, the name,description and nullable are not checked
      //sort the data set fields by order
      Arrays.sort(datasetFields, new Comparator<Field>() {
        @Override
        public int compare(Field f1, Field f2) {
          return f1.getOrder() - f2.getOrder();
        }
      });

      //note that the index in 1-based, NOT zero-based
      for (DataAssetField dataAssetField : dataAssetFields) {
        int index = dataAssetField.getIndex();
        if (index < 1 || index > datasetFields.length) {
          throw new InvalidDataAssetFieldsException(InvalidDataAssetFieldsException.ExceptionType.INDEX_RANGE, "The field index of data asset is out of the file indexes boundary");
        } else {
          //check the type.
          if (!checkDataTypeCompatibility(dataAssetField.getType().toUpperCase(), datasetFields[index - 1].getDataType().name())) {
            throw new InvalidDataAssetFieldsException(InvalidDataAssetFieldsException.ExceptionType.DATA_TYPE, "The data types of the fields do not match.");
          }
        }
      }

    } else {
      //for parquet and avro, the name and the type matter, order is not important. what about nullable?
      throw new UnsupportedOperationException("parquest and avro format are not supported yet");
    }
  }


  @Override
  public void validateDatasetAssignment(String sourceName, String dataAssetName, DataAssetLink link) {

    DataAsset dataAsset = dataAssetService.findByName(sourceName, dataAssetName);
    if (dataAsset == null) {
      throw new IllegalStateException(String.format("DataAsset %s does not exist", dataAssetName));
    }

    FileStructure fileStructure = dataConnectorInvokationService.retrieveDatasetStructure(link.getDataSetComp());
    Field[] fields = dataConnectorInvokationService.retrieveDatasetFields(link.getDataSetComp());

    validateStructure(dataAsset.getType().name(), dataAsset.getStructure(), fileStructure);

    validateFields(dataAsset.getType().name(), dataAsset.getFields(), fields);
  }


  @Override
  public void validateDataAssetStructureUpdate(String sourceName, String dataAssetName, DataAssetStructure structure) {

    DataAsset dataAsset = dataAssetService.findByName(sourceName, dataAssetName);

    if (dataAsset == null) {
      throw new IllegalStateException(String.format("DataAsset %s not found.", dataAssetName));
    }

    //it's valid if there is no dataset assigned
    List<DataAssetLink> links = dataAsset.getLinks();
    if (links == null || links.isEmpty()) {
      return;
    }

    //validate each dataset with the new DataAssetStructure
    for (DataAssetLink link : links) {
      FileStructure fileStructure = dataConnectorInvokationService.retrieveDatasetStructure(link.getDataSetComp());
      try {
        validateStructure(dataAsset.getType().name(), structure, fileStructure);
      } catch (InvalidDataAssetStructureException e) {
        switch (e.getExceptionType()) {
          case DATE_FORMAT:
            throw new InvalidDataAssetChangeException("The date format does not match the assigned file(s)");
          case DECIMAL_SEPARATOR:
            throw new InvalidDataAssetChangeException("The decimal separator does not match the assigned file(s)");
          case HAS_HEADER:
            throw new InvalidDataAssetChangeException("The header definition does not match the assigned file(s)");
          case VALUE_DELIMITER:
            throw new InvalidDataAssetChangeException("The value delimiter does not match the assigned file(s)");
          case FIELD_SEPARATOR:
            throw new InvalidDataAssetChangeException("The field separator does not match the assigned file(s)");
          case RECORD_DELIMITER:
            throw new InvalidDataAssetChangeException("The record separator does not match the assigned file(s)");
          default:
            throw new InvalidDataAssetChangeException("The data asset structure does not match the assigned file(s)");
        }
      }
    }
  }

  @Override
  public void validateDataAssetFieldsUpdate(String sourceName, String dataAssetName, List<DataAssetField> fieldList) {

    DataAsset dataAsset = dataAssetService.findByName(sourceName, dataAssetName);

    if (dataAsset == null) {
      throw new IllegalStateException(String.format("DataAsset %s not found.", dataAssetName));
    }

    //if there is no dataset assigned to it, then it's valid
    List<DataAssetLink> links = dataAsset.getLinks();
    if (links == null || links.isEmpty()) {
      return;
    }

    for (DataAssetLink link : links) {
      Field[] fields = dataConnectorInvokationService.retrieveDatasetFields(link.getDataSetComp());
      try {
        validateFields(dataAsset.getType().name(), fieldList, fields);
      } catch (InvalidDataAssetFieldsException e) {
        switch (e.getExceptionType()) {
          case INDEX_RANGE:
            throw new InvalidDataAssetChangeException("The field index do not match the assigned file(s)");
          case DATA_TYPE:
            throw new InvalidDataAssetChangeException("The data type of the field do not match the assigned file(s)");
          case FIELDS_NUMBER:
            throw new InvalidDataAssetChangeException("The fields number do not match the assigned files(s)");
        }
      }
    }

  }
}
