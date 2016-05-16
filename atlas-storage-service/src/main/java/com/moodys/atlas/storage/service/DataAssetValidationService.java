package com.moodys.atlas.storage.service;


import com.moodys.atlas.storage.domain.DataAssetField;
import com.moodys.atlas.storage.domain.DataAssetLink;
import com.moodys.atlas.storage.domain.DataAssetStructure;

import java.util.List;

public interface DataAssetValidationService {

  public void validateDatasetAssignment(String sourceName, String dataAssetName, DataAssetLink link);

  public void validateDataAssetStructureUpdate(String sourceName, String dataAssetName, DataAssetStructure structure);
  public void validateDataAssetFieldsUpdate(String sourceName, String dataAssetName, List<DataAssetField> fieldList);

}
