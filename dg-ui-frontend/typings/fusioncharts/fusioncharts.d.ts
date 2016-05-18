/**
 * Created by serpoletg on 03/04/2015.
 */
declare module fc {
  interface IChartConfiguration {
    /**
     * This name is used to refer to the current instance after the chart has been created.
     * The chart instance is available under this name in FusionCharts.items. If no id is provided, FusionCharts automatically generates an id for each chart.
     */
    id?:string;

    /**
     * Provide the name of the chart type to be rendered.
     * Full list of charts is available at [List of Charts](http://docs.fusioncharts.com/tutorial-setup-list-of-charts.html).
     * This parameter controls what chart will be rendered.
     * The data passed to the chart has to be compatible with the chart type specified here.
     */
      type?:string;

    /**
     * Set the width in pixels or percent such as 640 or '50%'.
     * If width is in pixels, there is no need to provide the px unit suffix.
     */
    width?:string;

    /**
     * Set the height in pixels or percent such as 640 or '50%'.
     * If height is in pixels, there is no need to provide the px unit suffix.
     */
    height?:string;

    /**
     * A chart needs reference to a DOM element on the page where it will be rendered.
     * You can provide the HTML ID of the element as a string to this option, or you can pass a reference of the DOMElement itself where the chart needs to be rendered.
     *
     * For example, if you have a DOMElement like :
     * ```xml
     *  <div class='chart-1' id='chart-container'></div>
     * ```
     * , you can provide the value of the div's id attribute to this option as a string.
     * Alternatively, you can pass direct reference to the DOMElement like: renderAt: document.getElementByClassName("chart-1").
     */
    renderAt?:Object;

    /**
     * This is the name of the format of data passed to the dataSource option below.
     * Currently, FusionCharts accepts only JSON and XML data.
     * The value for this option is one of the formats specified in [dataFormats](http://docs.fusioncharts.com/FusionCharts.properties.html#dataFormats).
     */
    dataFormat?:string;

    /**
     * Provide the source of data and configuration of the chart. FusionCharts accepts data in the formats specified in [dataFormats](http://docs.fusioncharts.com/FusionCharts.properties.html#dataFormats).
     * This is the preferred way to set data and configuration of the chart.
     */
    dataSource?:IChartDefinition;

    /**
     * You can bind multiple events to this particular chart instance through this option.
     * You need to pass an object to this option, where each key is an event name fired by FusionCharts and value for that key is a callback in the format of [eventListener](http://docs.fusioncharts.com/FusionCharts.typedefs.html#eventListener).
     */
    events?:Object;

    /**
     * Provide LinkedCharts configuration.
     * See [configureLink](http://docs.fusioncharts.com/FusionCharts.methods.html#configureLink) for details.
     */
    link?:IChartLink|IChartLink[];

    /**
     * Allows to set the common custom font face for all chart messages.
     */
    baseChartMessageFont?:string;

    /**
     * Allows to set the common custom font size for all chart messages.
     */
    baseChartMessageFontSize?:number;

    /**
     * Allows to set the common custom font color for all chart messages.
     */
    baseChartMessageColor?:string;

    /**
     * Allows to set the horizontal alignment for all chart message images, helps to horizontally align the image in the canvas.
     * Possible values are `left`, `right` and `middle`.
     */
    baseChartMessageImageHAlign?:string;

    /**
     * Allows to set the vertical alignment for all chart message images, helps to vertically align the image in the canvas. Possible values are `top`, `bottom` and `middle`.
     */
    baseChartMessageImageVAlign?:string;

    /**
     * Allows to set the common alpha value for all chart message images, helps to set the opacity of the image. Value can range from `0` to `100`.
     */
    baseChartMessageImageAlpha?:number;

    /**
     * Allows to set the common scaling for all chart message images, helps to magnify the image. Value can range from `0` to `300`.
     */
    baseChartMessageImageScale?:number;

    /**
     * Sets the background color of the chart's container HTML DOM element.
     * It is not same as bgColor chart attribute.
     * To see this background color, a chart's own background alpha must be set to 0 by setting bgAlpha attribute to "0" in chart attributes.
     */
    containerBackgroundColor?:string;

    /**
     * Sets the opacity of the container element.
     * Useful if the chart has underlying HTML elements or background image that needs to be made visible.
     * If opacity is reduced, you need to configure the chart itself to be transparent by setting the bgAlpha chart attribute.
     */
    containerBackgroundOpacity?:number;

    /**
     * Sets the CSS class that will be set on the container DOM element of the rendered chart. Default is fusioncharts-container.
     */
    containerClassName?:string;

    /**
     * Allows to set the message to be displayed before the chart data begins loading.
     * Additional properties like the font face, size, and color can be set by suffixing the property name with the corresponding message key, e.g. dataLoadStartMessageFont, dataLoadStartMessageFontSize, dataLoadStartMessageColor.
     * If message keys are not specified, base cosmetics are used. Now using a prefix 'i-', an image URL can be specified and the corresponding image will be displayed in place of the message. Alignment and properties of the image can be configured using attributes such as `dataLoadStartMessageHAlign`, `dataLoadStartMessageVAlign`, `dataLoadStartMessageAlpha` and so on.
     */
    dataLoadStartMessage?:string;

    /**
     * Allows to set the message to be displayed when there is an error loading the chart data.
     * Additional properties like the font face, size, and color can be set by suffixing the property name with the corresponding message key, e.g. dataLoadErrorMessageFont, dataLoadErrorMessageFontSize, dataLoadErrorMessageColor. If message keys are not specified, base cosmetics are used. Now using a prefix 'i-', an image URL can be specified and the corresponding image will be displayed in place of the message.
     * Alignment and properties of the image can be configured using attributes such as `dataLoadErrorMessageHAlign`, `dataLoadErrorMessageVAlign`, `dataLoadErrorMessageAlpha` and so on.
     */
    dataLoadErrorMessage?:string;

    /**
     * Allows to set the message to be displayed when the data loaded for the chart is invalid.
     * Additional properties like the font face, size, and color can be set by suffixing the property name with the corresponding message key, e.g. dataInvalidMessageFont, dataInvalidMessageFontSize, dataInvalidMessageColor. If message keys are not specified, base cosmetics are used. Now using a prefix 'i-', an image URL can be specified and the corresponding image will be displayed in place of the message.
     * Alignment and properties of the image can be configured using attributes such as `dataInvalidMessageHAlign`, `dataInvalidMessageVAlign`, `dataInvalidMessageAlpha` and so on.
     */
    dataInvalidMessage?:string;

    /**
     * Allows to set the message to be displayed if data loaded for the chart is empty.
     * Additional properties like the font face, size, and color can be set by suffixing the property name with the corresponding message key, e.g. dataEmptyMessageFont, dataEmptyMessageFontSize, dataEmptyMessageColor. If message keys are not specified, base cosmetics are used. Now using a prefix 'i-', an image URL can be specified and the corresponding image will be displayed in place of the message.
     * Alignment and properties of the image can be configured using attributes such as `dataEmptyMessageHAlign`, `dataEmptyMessageVAlign`, `dataEmptyMessageAlpha` and so on.
     */
    dataEmptyMessage?:string;

    /**
     * Allows to set the message to be displayed if specified chart type is not supported.
     * Additional properties like the font face, size, and color can be set by suffixing the property name with the corresponding message key, e.g. typeNotSupportedMessageFont, typeNotSupportedMessageFontSize, typeNotSupportedMessageColor. If message keys are not specified, base cosmetics are used. Now using a prefix 'i-', an image URL can be specified and the corresponding image will be displayed in place of the message. Alignment and properties of the image can be configured using attributes such as `typeNotSupportedMessageHAlign`, `typeNotSupportedMessageVAlign`, `typeNotSupportedMessageAlpha` and so on.
     */
    typeNotSupportedMessage?:string;

    /**
     * Allows to set the message to be displayed when the chart begins to load.
     * Additional properties like the font face, size, and color can be set by suffixing the property name with the corresponding message key, e.g. loadStartMessageFont, loadStartMessageFontSize, loadStartMessageColor. If message keys are not specified, base cosmetics are used. Now using a prefix 'i-', an image URL can be specified and the corresponding image will be displayed in place of the message.
     * Alignment and properties of the image can be configured using attributes such as `loadMessageHAlign`, `loadMessageVAlign`, `loadMessageAlpha` and so on.
     */
    loadMessage?:string;

    /**
     * Allows to set the message to be displayed if there was an error while rendering the chart.
     * Additional properties like the font face, size, and color can be set by suffixing the property name with the corresponding message key, e.g. renderErrorMessageFont, renderErrorMessageFontSize, renderErrorMessageColor. If message keys are not specified, base cosmetics are used. Now using a prefix 'i-', an image URL can be specified and the corresponding image will be displayed in place of the message.
     * Alignment and properties of the image can be configured using attributes such as `renderErrorMessageHAlign`, `renderErrorMessageVAlign`, `renderErrorMessageAlpha` and so on.
     */
    renderErrorMessage?:boolean;

    /**
     * Shows Loading chart... message in renderAt container if the chart needs to load additional resource/JS files.
     * This can be turned off by setting this option to false.
     */
    showChartLoadingMessage?:boolean;

    /**
     * FusionCharts shows a message while it is retrieving data from a url provided as dataSource.
     * While displaying the message the chart is grayed out and interaction on it is blocked.
     * This can be prevented by setting this option to false.
     */
    showDataLoadingMessage?:boolean;

  }

  interface IChartDefinition {
    data?:Object;
    categories?:Object;
    chart?:Object;
    dataset?:Object;
    linkdedata?:Object;
    trendlines?:Object;
    vtrendlines?:Object;
    annotations?:Object;
    colorrange?:Object;
    lineset?:Object;
    axis?:Object;
    connectors?:Object;
    pointers?:Object;
    value?:Object;
    processes?:Object;
    tasks?:Object;
    rows?:Object;
    columns?:Object;
    map?:Object;
    markers?:Object;
  }

  interface IChartEvent {
    eventType:string;
    /** The name of the event. */

    eventId:number;
    /** A unique ID associated with the event. Internally it is an incrementing counter and as such can be indirectly used to verify the order in which the event was fired. */

    sender:FusionCharts;
    /** The instance of FusionCharts object that fired this event. Occassionally, for events that are not fired by individual charts, but are fired by the framework, will have the framework as this property. */

    cancelled:boolean;
    /** Shows whether an event's propagation was cancelled or not. It is set to true when .stopPropagation() is called.*/


    stopPropagation:Function;
    /** Call this function from within a listener to prevent subsequent listeners from being executed.*/

    prevented:boolean;
    /** Shows whether the default action of this event has been prevented. It is set to true when .preventDefault() is called.*/

    preventDefault:Function;
    /** Call this function to prevent the default action of an event. For example, for the event FusionCharts#event:beforeResize, if you do .preventDefault(), the resize will never take place and instead FusionCharts#event:resizeCancelled will be fired.*/

    detached:boolean;
    /** Denotes whether a listener has been detached and no longer gets executed for any subsequent event of this particular type.*/

    detachHandler:Function;
  }

  interface IChartLink {
    /** Type of linked chart. */
      type?:string;
    /** Width of linked chart. */
    width?:number;
    /** Height of linked chart. */
    height?:number;
    /** Definition of the button to go previous in linked charts arborescence. */
    overlayButton?:IChartOverlayButton;
    /** Since linked charts are multi-level drill-down, you can configure the parameters of a particular drill-down level by specifying it in this parameter. */
    level?:number;
  }

  interface IChartOverlayButton {
    /** Whether to show the button or not. */
    show: boolean;
    /** The label of the button. The default is "Close" or "Back". */
    message: string;
    /** Background color of the button in hex format. */
    bgColor: string;

    /** Border color of the button in hex format. */
    borderColor: string;

    /** Font family of the button (comma separated list of fonts). */
    font: string;

    /** The color of the button label text. */
    fontColor: string;

    /** The size of the button label text. */
    fontSize: string;

    /** Specify whether the button label text appears bold. */
    bold: boolean;

    /** The padding between the label and the edges of the button. */
    padding: number;
  }

  interface   IChartDebugger {
    /**
     * The FusionCharts debugger is not enabled by default. This method allows us to enable the debugger and also optionally provide basic debugger configuration.
     * The debugger works in conjunction with the browser's JavaScript console or any other special console-like implementation that you may have. To enable the debugger, call this function and pass a callback that outputs the message to the JavaScript console.
     * The code would log the activities of every chart and the entire framework.
     * @param state Specifies whether to enable logging of debug information.
     * @param outputTo The function to which the debugger output will be passed on.
     * @param outputFormat Can be one of the accepted format names such as "text", "verbose", "event".
     */
    enable(state:boolean, outputTo?:Function, outputFormat?:string):boolean;
  }
}

declare class FusionCharts implements EventTarget {
  constructor(pConf:fc.IChartConfiguration);

  /**
   * Gets or sets the chart type of an instance of FusionCharts.
   * To change the chart type, pass the new chart type as the first parameter to this function. The chart is automatically re-rendered when a new chart type is set. To get the current chart type, call this function without any parameters.
   * When the chart type is changed using this method, the chart is re-rendered and the FusionCharts#event:chartTypeChanged event is fired.
   * @param pType Sets the new chart type.
   */
  chartType(pType:string);

  /**
   * Creating a chart using new FusionCharts() merely creates a JavaScript instance of the chart. The chart is not yet made visible on the page. In order to render it in a location on the page, this function needs to be called. Usually, when the chart is instantiated, the renderAt construction parameter specifies the element on the page inside which the chart will be rendered. If the renderAt parameter is not provided during construction of the page, then the same can be provided as the first parameter of this function.
   * This function renders a chart inside a container element on a page. If a chart is already rendered, it can be re-rendered inside the same container DOM element or some other element.
   */
  render():void;

  /**
   * Calling this function on an instance of FusionCharts disposes the chart completely. This removes it from the DOM tree and also clears the entire chart object. Upon successful disposal, chartInstance.disposed is set to true.
   */
  dispose():void;

  /**
   * Update the data of a chart in the format specified in by the format parameter. The data passed as the format parameter should be in one of the FusionCharts~dataFormats. When this function is called on a chart which has already rendered, the chart is instantly updated with the new data.
   * This function can also be used to set data of a chart before it has rendered. In that case, the data being set is stored internally and passed on to the chart when it is rendered. However, this is not the preferred way to set chart data. Instead, initial chart data should be passed in the FusionCharts constructor.
   */
  setChartData(pData:Object, pFormat?:string):void;

  /**
   * Removes an event that was originally added using addEventListener.
   * @param type Event type as string.
   * @param listener Listener to remove.
   */
  removeEventListener(type:string, listener:EventListener):void;

  /**
   * Static Method, Removes an event that was originally added using addEventListener.
   * @param type Event type as string.
   * @param listener Listener to remove.
   */
  static removeEventListener(type:string, listener:EventListener):void;

  /**
   * Listen to events fired by an individual chart. For more information on the available events, refer to the events section.
   * @param type Event type as string.
   * @param listener Listener to execute when event raised.
   */
  addEventListener(type:string, listener:EventListener):void;

  /**
   * Static method, Listen to events fired by an individual chart. For more information on the available events, refer to the events section.
   * @param type Event type as string.
   * @param listener Listener to execute when event raised.
   */
  static addEventListener(type:string, listener:EventListener):void;

  /**
   * Dispatches an event.
   * @param type Event type as string.
   * @param listener Listener to execute when event raised.
   */
  dispatchEvent(evt:Event):boolean;

  /**
   * Calling this function on a chart instance resizes the chart to the specified width or height.
   * This function is only available for charts that have already rendered.
   * Similar to setting the width and height of a chart through the new FusionCharts() constructor, the values for width and height can be passed in number or percentage for this function.
   * Setting a percentage causes the chart to partially redraw itself when chart container is resized.
   * Calling this function without a value for either width or height will return the current value of the width or height respectively.
   * For example, this function is useful in controlling the dimension of chart based on the change in dimension of a resizable dialog box.
   * It is also useful in resizing charts for responsive layouts, based on device orientation change.
   * @param pWidth Set the width of the chart in pixels or percent.
   * @param height Set the height of the chart in pixels or percent.
   */
  resizeTo(pWidth:string, height:string):void;

  /**
   * The reference to every new instance of FusionCharts is maintained in this object with the chart ID as the key.
   * Upon FusionCharts#dispose of the instance, the key is removed from this. One can iterate through all instances of FusionCharts using this object.
   * A short-hand approach to accessing a single chart by its id is to use FusionCharts function itself but without the new operator and by passing the chart id as the first parameter.
   */
  static items:Object;

  /**
   * Configure the properties of LinkedCharts. This function accepts all properties that FusionCharts constructor function accepts.
   * Any property passed to this function is applied to the LinkedCharts. If no properties are provided, LinkedCharts will inherit properties from the parent chart.
   * LinkedCharts are essentially n-level drill-down of charts, where data points on one chart can create and render a new chart.
   * Each level can be configured by passing the level as the second parameter of this function. Note that the first chart that triggers the drill-down (root chart) has level 0.
   * Alternatively, LinkedCharts configuration for multiple levels of drill-down can be configured at once by passing them as an array to this function.
   * In that case, the array is the only parameter passed to the function.
   * @param param IChartLink definition or Array of IChartLink (index of array depicts the level of applying).
   * @param level Level to apply IChartLink
   */
  configureLink(param:fc.IChartLink, level?:number):void;

  /**
   * This function allows to register callback functions to be executed when FusionCharts library is ready to be used.
   * In general, the framework is ready after DOMContentLoaded browser event has been fired and all the initial dependent files/modules are available.
   * One can attach multiple callbacks by calling this function any number of time.
   * The callback function is executed even when attached after FusionCharts is already ready!
   * Thus, it is recommended that all entry-point and initialization codes are written within this block. This also helps in neatly organizing all codes within a script file or the page <head> and as such contextually separating code from HTML blocks.
   * @param cb Pass a function that would be executed as callback when FusionCharts framework is ready.
   * @param args Argument to be passed on to the callback function.
   */
  static ready(cb:() => void, args?:Object);

  /**
   * The debugger is used to trace errors within charts and verify the flow of events for a chart in case of unexpected behaviors.
   * The debugger logs all activities resulting from firing of all events in the framwork.
   */
  debugger:fc.IChartDebugger;
}