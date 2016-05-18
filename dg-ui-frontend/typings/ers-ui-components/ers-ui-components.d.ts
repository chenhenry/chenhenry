/**
 * ers-ui-components - 
 * @version v%ERS_COMPONENTS_VERSION%
 * @link http://ersgit.analytics.moodys.net/projects/ERSUI
 * @authors ERS UI Component Team
 * @license private
 */

/// <reference path="../angularjs/angular.d.ts" />
/// <reference path="../jquery/jquery.d.ts" />
/// <reference path="../angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../fusioncharts/fusioncharts.d.ts" />

/**
 * Created by serpoletg on 16/07/2015.
 */
declare module ers.components.utility.checks {
    /**
     * Test if a value is truly a number, NaN not considered as a valid number.
     * @param pValue Object to test.
     * @return {boolean} True if parameter is a number.
     */
    function isNumber(pValue: Object): boolean;
    /**
     * Test if a string value is different from undefined, null and empty string.
     * @param pValue Value to test.
     * @return {boolean} Boolean.
     */
    function isEmpty(pValue: string): boolean;
}

/**
 * Created by zhangfa on 5/26/2015.
 */
declare module ers.components.core.service {
    interface ITemplateHelper {
        fetchTemplate(url: string): string | ng.IPromise<string>;
    }
}

/**
 * Created by ZhangFa on 5/13/2015.
 */
declare module ers.components.core.service {
    /**
     * Defines a shared pdf service which convert a html DOM into PDF.
     */
    interface IPDFService {
        /**
         * Convert a HTML DOM into PDF.
         *
         * @param dom The DOM node to be converted into pdf
         * @param callback A callback function to receive the generated pdf data as a string
         */
        createPDF(dom: HTMLElement, callback: (dataUri: string) => void): void;
    }
}

/**
 * Created by zhangfa on 5/26/2015.
 */
declare module ers.components.core.service {
    /**
     * Validator interface used to be registered in INgModelController.$validators
     */
    interface IValidator {
        (modelView?: Object, viewValue?: Object): boolean;
    }
    /**
     * An validation rule used to combine a validator and its error message
     */
    interface IValidationRule {
        /** code of the rule, which must be unique for one component **/
        key: string;
        /** error message to show when validator returns false **/
        errorMessage: string;
        /** validator to be registered in INgModelController.$validators **/
        validator?: IValidator;
    }
    /**
     * An interface used to be registered in IValidationManager, usually expected to be a controller
     */
    interface IValidationTarget {
        /**
         * function to get an input element which the error message will be showed upon
         */
        inputElement(): ng.IAugmentedJQuery;
        /**
         * function to get an array of validation rules
         */
        validationRules(): IValidationRule[];
        /**
         * function to get an instance of NgModelController, in which validators of validator rules will be registered
         */
        ngModelController(): ng.INgModelController;
        /** @returns Get the ID of the target element. */
        id(): string;
    }
    /**
     * A ValidationManager interface used to reigster & unregister IValidationTarget instances
     */
    interface IValidationManager {
        /**
         * Register an IValidationTarget instance
         *
         * @param target The IValidationTarget instance to register
         */
        registerTarget(target: IValidationTarget): void;
        /**
         * Unregister an IValidationTarget instance
         *
         * @param target The IValidationTarget instance to unregister
         */
        unregisterTarget(target: IValidationTarget): void;
    }
    /**
     *  A Validation Manager Provider interface to get an IValidationManager instance
     */
    interface IValidationManagerProvider extends ng.IServiceProvider {
        /**
         * register the service name of error renderer that will be injected into the IValidationManager instance
         *
         * @param name service name of IValidationErrorRender instance registered in angular
         */
        setErrorRendererName(name: string): any;
    }
    /**
     * A Validation Error Render interface to show/hide error messages caused by validation
     */
    interface IValidationErrorRender {
        /**
         * Create or show the messages on a specfic html element
         *
         * @param targetElement The element that error messages will be shown upon.
         * @param errorMessageProvider The function to get a array of error messages
         */
        render(targetElement: ng.IAugmentedJQuery, targetID: string, errorMessageProvider: () => string[]): any;
        /**
         * Destroy or hide the messages previously shown by the renderer on a specfic html element
         *
         * @param targetElement The element that error messages will be cleared
         */
        clear(targetElement: ng.IAugmentedJQuery): any;
    }
}

/**
 * Created by ZhangFa on 6/16/2015.
 */
declare module ers.components.core.service {
    /**
     * Model object of placement
     */
    interface IPlacementObject {
        auto: boolean;
        side: string;
        alignment: string;
        toString(): string;
    }
    /**
     * The placement service is a common shared service for popup element positioning
     */
    interface IPlacementService {
        /**
         * Puts the target element in a specific position aside the reference point or element
         *
         * @param target The target element to place
         * @param reference The positioning reference which the target will be placed aside. Can be an element or screen coordinate.
         * @param placement Specifies on which side or direction of reference target will be placed.
         *        If the reference is an element, there are for 12 options:
         *
         *                                target
         *                        **********************
         *                              -----------
         *                             |           |
         *        "top":               | reference |
         *                             |           |
         *                              -----------
         *
         *                                              target
         *                             **********************
         *                              -----------
         *                             |           |
         *        "top-left":          | reference |
         *                             |           |
         *                              -----------
         *
         *                   target
         *                   **********************
         *                              -----------
         *                             |           |
         *        "top-right":         | reference |
         *                             |           |
         *                              -----------
         *
         *                              -----------
         *                             |           |
         *        "bottom":            | reference |
         *                             |           |
         *                              -----------
         *                          *********************
         *                                 target
         *
         *                              -----------
         *                             |           |
         *        "bottom-left":       | reference |
         *                             |           |
         *                              -----------    target
         *                             **********************
         *
         *                              -----------
         *                             |           |
         *        "bottom-right":      | reference |
         *                             |           |
         *                    target    -----------
         *                   **********************
         *
         *                              -----------
         *                    target   |           |
         *        "left":    ********* | reference |
         *                             |           |
         *                              -----------
         *
         *                              target   -----------
         *                            ********* |           |
         *        "left-top":                   | reference |
         *                                      |           |
         *                                       -----------
         *
         *                                       -----------
         *                                      |           |
         *        "left-top":           target  | reference |
         *                            ********* |           |
         *                                       -----------
         *
         *                                       -----------
         *                                      |           | target
         *        "right":                      | reference | *********
         *                                      |           |
         *                                       -----------
         *
         *                                       -----------  target
         *                                      |           | *********
         *        "right-top":                  | reference |
         *                                      |           |
         *                                       -----------
         *
         *
         *                                       -----------
         *                                      |           |
         *        "right-top":                  | reference |   target
         *                                      |           | *********
         *                                       -----------
         *
         *        If the reference is a coordinate, there are also 12 options:
         *
         *
         *                                       ----------
         *                                      |          |
         *        "top":                        |  target  |
         *                                      |          |
         *                                       ----------
         *                                            * reference
         *
         *
         *                                       ----------
         *                                      |          |
         *        "top-left", "left-top":       |  target  |
         *                                      |          |
         *                                       ----------
         *                                                 * reference
         *
         *
         *                                       ----------
         *                                      |          |
         *        "bottom":                     |  target  |
         *                                      |          |
         *                                       ----------
         *                                            * reference
         *
         *
         *                                                 * reference
         *                                       ----------
         *                                      |          |
         *        "bottom-left", "left-bottom": |  target  |
         *                                      |          |
         *                                       ----------
         *
         *
         *                                       ----------
         *                                      |          |
         *        "left":                       |  target  | * reference
         *                                      |          |
         *                                       ----------
         *
         *
         *                                       ----------
         *                                      |          |
         *        "right":          reference * |  target  |
         *                                      |          |
         *                                       ----------
         *
         *
         *                                                  * reference
         *                                                   ----------
         *                                                  |          |
         *        "right-bottom", "bottom-right":           |  target  |
         *                                                  |          |
         *                                                   ----------
         *
         *
         *                                        ----------
         *                                       |          |
         *        "right-top", "top-right":      |  target  |
         *                                       |          |
         *                                        ----------
         *                                                  * reference
         *
         *        Each option can be used together with "auto" like: "auto left", "auto left-top", "right auto", "bottom-right auto"......,
         *        so that the placement service will the auto judge the best placement if specified placement can not be
         *        perfectly satisfied
         *
         * @param container The parent element of the target. "body" by default if not specified.
         *
         * @Returns The placed target element
         *
         */
        applyPlacement(target: JQuery, reference: JQuery | JQueryCoordinates, placement: string | IPlacementObject, container: string | JQuery): JQuery;
        /**
         * Check if a placement string is valid or acceptable
         *
         * @param placement The placement string
         */
        isValid(placement: string): boolean;
        /**
         * Convert the placement string to the model object that implements [[IPlacementObject]]
         *
         * @param The placement string to convert
         *
         * @Returns The transformed [[IPlacementObject]] instance
         */
        toPlacementObject(placement: string): IPlacementObject;
    }
}

/**
 * Created by zhangfa on 6/23/2015.
 */
declare module ers.components.core.service {
    interface IResizeDimensions {
        width: number;
        height: number;
    }
    interface IResizeListener {
        resizeDidOccur(dimensions: IResizeDimensions): any;
    }
    /**
     * @ngdoc service
     * @module ers.services.resize
     * @name ResizeService
     *
     * @description
     *
     * Defines a resize service usable by components.
     */
    interface IResizeService {
        /**
         * @ngdoc method
         * @name ResizeService#registerListener
         *
         * @description
         *
         * Registers a listener that will be called when a resize event fires.
         *
         *
         * @param {IResizeListener} listener The listener to be registered.
         *
         * Must conform to the IResizeListener interface.
         */
        registerListener(listener: IResizeListener): void;
    }
}

declare module ers.components.core.service {
    /**
     *
     */
    interface IContainerEventService {
        /**
         * Register a listener to be notified when an event was sent from a parent container
         * @param eventType type of the event
         * @param $scope scope of the component
         * @param listener listener
         */
        on(eventType: string, $scope: ng.IScope, listener: Function): void;
        /**
         * Dispatches an event to children => executes all listeners
         * @param eventType type of the event
         * @param $scope scope of the container
         */
        dispatch(eventType: string, $scope: ng.IScope): void;
        /**
         * Register an event dispatcher.
         * @param eventTypes types of the event
         * @param $scope scope of the container.
         */
        registerDispatcher(eventTypes: (Array<string> | string), $scope: ng.IScope): void;
    }
}


/**
 * The Core Services Module
 *
 * Created by zhangfa on 3/18/2015.
 */
declare module ers.components.core.service {
    var _module: ng.IModule;
}


/**
 * Created by zhangfa on 5/28/2015.
 */
declare module ers.components.utility {
    import IValidationRule = ers.components.core.service.IValidationRule;
    var DEFAULT_VALIDATION_RULES: {
        REQUIRED: () => IValidationRule;
        PATTERN: (pattern: string) => IValidationRule;
        MIN_LENGTH: (minLength: number) => IValidationRule;
        MAX_LENGTH: (maxlength: number) => IValidationRule;
        NUMBER: () => IValidationRule;
        NUMBER_RANGE: (min: number, max: number) => IValidationRule;
        MODEL: () => IValidationRule;
        MIN_DATE: (minDate: () => Date) => IValidationRule;
        MAX_DATE: (maxDate: () => Date) => IValidationRule;
    };
}


declare module ers.components.utility {
    /**
     * Interface of keyboard events
     */
    interface IKEY {
        LEFT_ARROW: number;
        UP_ARROW: number;
        RIGHT_ARROW: number;
        DOWN_ARROW: number;
        SPACE_BAR: number;
        ENTER: number;
        ESCAPE: number;
        TAB: number;
        BACKSPACE: number;
    }
    /**
     * Utility which contains the keyboard event constants.
     */
    var KEY: IKEY;
}


/**
 * Created by zhangfa on 6/25/2015.
 */
declare module ers.components.utility {
    interface ITriggerEventHandler {
        onTrigger: (e?: JQueryEventObject) => void;
        onUntrigger?: (e?: JQueryEventObject) => void;
        toggle?: (e?: JQueryEventObject) => void;
    }
    class TriggerBindUtil {
        static bind($host: ng.IAugmentedJQuery, triggers: string, handler: ITriggerEventHandler): void;
        static unBind($host: ng.IAugmentedJQuery, triggers: string, handler: ITriggerEventHandler): void;
    }
}

/**
 * Created by BERTHETO on 11/28/2014.
 *
 * The component Module.
 */
declare module ers.components.core {
    var coreModule: ng.IModule;
}


declare module ers.components.utility {
}


declare module ers.components.utility {
}

declare module ers.components.button {
    /**
     * @ngdoc directive
     * @module ers.components.button
     * @name ersButton
     * @restrict E
     *
     * @description
     *
     * Use the `ers-button` component to:
     *
     * - Specify custom behavior when the button element is clicked
     * - Customize the button label and appearance
     *
     * <div style="margin: 30px;">
     *   <ers-button label="Primary Button"></ers-button>
     *   <ers-button label="Secondary Button" class="secondary"></ers-button>
     * </div>
     *
     * #### Visual Design Guidelines
     *
     * Use buttons when requesting a user to take an action changing the state of the application or
     * application data. Some general guidelines for creating and using buttons:
     *
     * - Identify the most important clickable elements.
     *
     * - Make clickable elements easily identifiable.
     *
     * - Make clickable elements easily accessible.
     *
     * - Label clickable elements with what they do.
     *
     * - Limit the text.  Less is more.
     *
     * See  [Button Specifications](#/components/ersButton/ux) for more information.
     *
     *
     * #### Examples
     *
     * The following example displays the code from the description display:
     *
     * ```xml
     *
     * <div style="margin: 30px;">
     *   <ers-button label="Primary Button"></ers-button>
     *   <ers-button label="Secondary Button" class="secondary"></ers-button>
     * </div>
     *
     * ```
     *
     * Consider the following examples of numerous ways to use the button component:
     *
     * ```xml
     * <div ng-controller="MyController as ctrl">
     *   <ers-button label="My button" ng-click="ctrl.click()"></ers-button>
     *   <ers-button label="My button" ng-disabled="true"></ers-button>
     *   <ers-button label="My button" class="secondary"></ers-button>
     *   <ers-button label="My button" name="myname"></ers-button>
     * </div>
     * ```
     *
     * @param [label] {string}
     *
     * Sets the text that appears on the button.
     *
     * ```xml
     * <ers-button label="My button"></ers-button>
     *
     * ```
     *
     * @param {string} [name]
     *
     * Sets the button name.
     *
     * @default null
     *
     * ```xml
     *
     * <ers-button label="My button" name="myname"></ers-button>
     *
     * ```
     *
     * @param [type] {string}
     *
     * Sets the type of button and hints at how it is used, *for example*, "submit", "button", "reset", etc.
     *
     * ```xml
     * <ers-button type="submit"></ers-button>
     *
     * ```
     *
     * @param {string} [form]
     *
     * Sets the form id of the button if the button is an auto commit.
     *
     * **Note** The form must have a specific ID, not just a name.
     *
     * ```xml
     *
     * <form name="myForm" role="form" id="myForm">
     *    <ers-button form="myForm" type="submit"></ers-button>
     * </form>
     *
     * ```
     *
     */
    class ButtonComponent {
        class: string;
        label: string;
        name: string;
        _form: string;
        type: string;
        disabled: boolean;
        private _ngClass;
        private element;
        static $inject: string[];
        constructor(element: ng.IAugmentedJQuery);
        private updateClass();
        onClick(e: MouseEvent): void;
        ngClass: string;
        form: string;
    }
}


/**
 * Created by fangiot on 12/12/2014.
 */
declare module ers.components.core {
    /**
     * Base controller for all component controllers. Stores a reference to the scope and element and adds the
     * 'ers-component' class to the element.
     */
    class BaseController {
        /**
         * @private
         *
         * The scope to which this directive is bound.
         */
        protected $scope: ng.IScope;
        /**
         * @private
         *
         * The element to which this directive is linked.
         */
        protected element: ng.IAugmentedJQuery;
        /**
         * Attributes of the directive. For internal use only.
         */
        protected $attrs: ng.IAttributes;
        /**
         * This method is to be called by classes that extend BaseController. You should never create an instance of this
         * class directly.
         *
         * @constructor
         *
         * @param $scope The scope to which this directive is bound.
         * @param $element The jQuery element to which this directive is bound.
         */
        constructor($scope?: ng.IScope, $element?: ng.IAugmentedJQuery, $attrs?: ng.IAttributes);
        /**
         * Links this directive to the specified element and adds the `ers-component` class as well.
         *
         * @param $scope The scope to which this directive is bound.
         * @param element The element to which this directive should be linked.
         * @param attributes The array of attributes on the HTML element.
         */
        link($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes): void;
    }
}


/**
 * @ngdoc directive
 * @module ers.components.accordion
 * @name ersAccordionGroup
 * @restrict E
 *
 * @description
 * Use the `ers-accordion-group` to create individual accordion items within the accordion group.
 * <a ui-sref='components.ersAccordion.documentation'>Accordion</a> directive.
 *
 *
 * Multiple `ers-accordion-group` components can reside within a single `ers-accordion` directive.
 *
 * There are two ways to add a heading to the `ers-accordion-group`:
 *
 *  - Add plain text within the heading attribute of the `ers-accordion-group`.
 *  - Use the `ers-accordion-heading` directive to add any HTML content to the heading.
 *
 * Both methods place the heading text (or HTML) in the accordion groups heading section which can be styled with CSS.
 *
 * #### Visual Design Guidelines
 *
 * For more information, see the <a ui-sref='components.ersAccordion.documentation'>Accordion</a> for more information.
 *
 * #### Example
 *
 * The following sample must be wrapped in `ers-accordion`.
 *
 * ```xml
 *  <ers-accordion-group heading="Group 3">
 *      Group 3 Content
 *   </ers-accordion-group>
 * ```
 *
 *   See the [Accordion Component](#/components/ersAccordion/documentation) component for additional information.
 *
 * @param {string} heading
 * Add the title displayed within the accordion's heading area and activation, that is, clickable, element.
 *
 * @param {string} [sub-heading]
 * Adds a subheading, or small snippet of text next to the accordion heading.
 *
 * @param {boolean} [is-open=false]
 * Determines whether or not this group is open when the page loads. You can use this to initialize the group's
 * starting
 * state by providing `is-open="true"`, or you can use a more complex expression and control it programmatically.
 *
 * ```xml
 * <ers-checkbox ng-model="firstIsOpen">First is Open: {{firstIsOpen}}</ers-checkbox>
 *
 * <ers-accordion>
 *   <ers-accordion-group heading="Open" is-open="firstIsOpen">
 *     I should start out open
 *   </ers-accordion-group>
 * </ers-accordion>
 * ```
 *
 * @param {boolean} [ng-disabled=false]
 * Sets the individual accordion to disabled or not. As a group component, `false`
 * overrides the parent accordion's directive setting of `true`, allowing you to disable a single group while
 * the remaining accordion groups are still enabled.
 *
 *
 *
 */
declare module ers.components.accordion {
    import AccordionComponent = ers.components.accordion.AccordionComponent;
    class AccordionGroupComponent extends ers.components.core.BaseController {
        /**
         * The parent accordion.
         *
         * This is automatically set by the accordion group component when it is initialized.
         */
        parent: AccordionComponent;
        private headingTransclude;
        heading: string;
        subheading: string;
        private _isOpen;
        ngDisabled: boolean;
        constructor($scope: ng.IScope);
        setHeadingTransclude(element: ng.IAugmentedJQuery): void;
        toggleOpen(): void;
        /**
         * @returns {boolean} Returns true if the group component is open, false otherwise.
         */
        /**
         * Set the _isOpen value.
         * @param value The new value for the _isOpen propertie.
         */
        isOpen: boolean;
    }
}

/**
 * @ngdoc directive
 * @module ers.components.accordion
 * @name ersAccordion
 * @restrict E
 *
 * @description
 *
 * Use `ers-accordion` to group common content into a user-controlled collapsible section.
 * The optional 'close-other' mode closes other groups when one is opened, thus displaying only one group at one time.
 *
 *
 * <ers-accordion close-others="true" style="margin: 30px; display: block;">
 *   <ers-accordion-group heading="Group 1">
 *     Group 1 Content
 *   </ers-accordion-group>
 *   <ers-accordion-group heading="Group 2" subheading="(10 items)">
 *     Group 2 Content - There are not actually 10 items, and this illustrates a sub-heading!
 *   </ers-accordion-group>
 *   <ers-accordion-group heading="Group 3">
 *     Group 3 Content
 *   </ers-accordion-group>
 * </ers-accordion>
 *
 * The Accordion component contains two items:
 *
 * - `ers-accordion` wraps all of the individual accordion groups.
 *
 * - [ers-accordion-group](#/components/ersAccordionGroup/documentation) wraps each accordion item content.
 *
 * This page describes the `ers-accordion`. See the
 * [Accordion Group](#/components/ersAccordionGroup/documentation) directive for information on how to add content.
 *
 * You may also include any HTML that you wish outside of an `ers-accordion-group`. It appears in sequence with
 * the accordion groups, but not within any of them. This content is not collapsible. Use this to add heading sections
 * that separate accordion groups.
 * For more information, see [Examples](#/components/ersAccordion/examples).
 *
 * <ers-accordion>
 *   <ers-accordion-group heading="Group 1">
 *     Group 1 Content
 *   </ers-accordion-group>
 *
 *   <h6>I am a heading that appears between the two groups and is not collapsible.</h6>
 *
 *   <ers-accordion-group heading="Group 2">
 *     Group 2 Content
 *   </ers-accordion-group>
 * </ers-accordion>
 *
 * #### Visual Design Guidelines
 *
 * Use the `ers-accordion` to organize pages that contain large amounts of content that can be
 * grouped together in a logical fashion.
 *
 * ##### Styles
 *
 * `ers-accordion` currently has only one style but can be themed using standard CSS.
 *
 * ##### Best Practices
 *
 * Rarely, (if ever), use an accordion inside of another accordion, at the risk of confusing your users.
 *
 * Accordion groups should generally be limited to 10-15 items to avoid overwhelming the user with a
 * drastic amount of content.
 *
 * #### Example
 *
 * The following example is used to generate the accordion shown in the description display:
 *
 *
 * ```xml
 * <ers-accordion close-others="true" style="margin: 30px; display: block;">
 *   <ers-accordion-group heading="Group 1">
 *     Group 1 Content
 *   </ers-accordion-group>
 *   <ers-accordion-group heading="Group 2" subheading="(10 items)">
 *     Group 2 Content - This illustrates a sub-heading, not ten items.
 *   </ers-accordion-group>
 *   <ers-accordion-group heading="Group 3">
 *     Group 3 Content
 *   </ers-accordion-group>
 *  </ers-accordion>
 *
 * ```
 *
 *
 * @param {boolean} [ng-disabled=false]
 * Enables or disables the accordion.
 *
 * @param {boolean} [close-others=true] Sets the action of the accordion when another accordion group is clicked. True
 * closes the previously opened accordion group before opening the selected accordion group.
 *
 *
 *
 */
declare module ers.components.accordion {
    import AccordionGroupComponent = ers.components.accordion.AccordionGroupComponent;
    /**
     * AccordionComponent class
     * @class
     */
    class AccordionComponent extends ers.components.core.BaseController {
        groups: AccordionGroupComponent[];
        closeOthers: boolean;
        ngDisabled: boolean;
        /**
         * @constructor
         * @param $scope the isolated scope
         */
        constructor($scope: ng.IScope);
        /**
         * @function Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
         * @param openGroup the group to keep open.
         */
        closeOtherAccordions(openGroup: AccordionGroupComponent): void;
        /**
         * @function This is called from the accordion-group directive to add itself to the accordion
         * @param group
         */
        addGroup(group: AccordionGroupComponent): void;
        /**
         * @function This is called from the accordion-group directive when to remove itself
         * @param group
         */
        removeGroup(group: AccordionGroupComponent): void;
    }
}


declare module ers.components.core.scope {
    interface IEditableScope extends ng.IScope {
        /**
         * Name of the ng-model to be used
         * Mandatory parameter or the component will not work
         */
        ngModel: Object;
        ngReadonly: boolean;
        ngRequired: boolean;
        ngDisabled: boolean;
    }
}

declare module ers.components.calendar {
    interface ICalendarScope extends ers.components.core.scope.IEditableScope {
        /**
         * The date format you want to use. This is based on the angular
         * date filter
         */
        dateFormat: string;
        /**
         * desired minimum date. A user will not be able to select a
         * date less than this one. This is an optional parameter
         */
        minDate: Date;
        /**
         * desired maximum date. A user will not be able to select a
         * date upper than this one. This is an optional parameter
         */
        maxDate: Date;
        /**
         * In the calendar pop up window, you have a button to select today's date. You
         * can customize the text using this attribute
         */
        currentText: string;
        /**
         * In the calendar pop up window, you have a button to clear the selected date. You
         * can customize the text using this attribute
         */
        clearText: string;
        /**
         * In the calendar pop up window, you have a button to close the pop up. You
         * can customize the text using this attribute
         */
        closeText: string;
        /**
         * you can programatically open the date picker using this field
         * This field will be set to true when the picker is open
         */
        popupOpened: boolean;
        /**
         * You customize the calendar component in order to show a button bar letting the user
         * to show eighter today's date or clear your choice. You will also have a cancel
         * button letting you close the pickup window
         * @type {boolean}
         */
        showButtonBar: boolean;
    }
}

/**
 * Created by GunduzB on 2/17/2015.
 */
declare module ers.components.calendar {
    import IValidationManager = ers.components.core.service.IValidationManager;
    import IValidationTarget = ers.components.core.service.IValidationTarget;
    import IValidationRule = ers.components.core.service.IValidationRule;
    /**
     * The ers-components-calendar directive allows you to display a date picker using the provided
     * `ers-calendar` component.
     *
     * ### Available Options
     *
     * The following are the options which are currently available for this component:
     *  * [ngModel](#ngmodel)
     *  * [ngReadonly](#ngreadonly)
     *  * [ngDisabled](#ngdisabled)
     *  * [dateFormat](#dateformat)
     *  * [mindate](#mindate)
     *  * [maxdate](#maxdate)
     *  * [currentText](#currenttext)
     *  * [closeText](#closetext)
     *  * [clearText](#cleartext)
     *
     * ### Available Methods
     *
     * The following methods are currently available for this component:
     *
     * * [showPopup](#showPopup)
     *
     *
     * @param [ngModel] {string}
     *
     * @param [ngReadonly] {boolean}
     *
     * @param  [ngDisabled] {boolean}
     *
     * @param  [dateFormat] {string}
     *
     * @param [mindate] {string}
     *
     * @param [maxdate] {string}
     *
     * @param  [currentText] {string}
     *
     * @param  [closeText] {string}
     *
     * @param  [clearText] {string}
     *
     *
     */
    class CalendarController implements IValidationTarget {
        static DEFAULT_DATE_FORMAT: string;
        /**
         * Array which contains the setters ($set) to override in the input ngModelController (not the ngModelController of
         * the directive).
         * For information, the setter defined in the array below are overrode because we need to reverberate the state of the
         * wrapped input on the directive element.
         */
        static SETTER_TO_OVERRIDE: string[];
        /**
         * @private
         *
         * The scope to which this directive is bound.
         */
        private $scope;
        /**
         * You must specify an ngModel in order to use the ers-calendar directive.
         * The ngModel you use must be a <b>Date</b> and must be provided by the scope of the
         * directive through an attribute
         *
         * Review the <a href="https://docs.angularjs.org/api/ng/directive/ngModel" target="_blank">
         *     angular documentation</a>
         * for more information.
         *
         * You should particularly review the 'CSS classes' section which may help
         * you understand how the validity and modification of the models are handled by
         * angular.
         *
         * ### Example
         * you can specify an `ers-calendar` directive with a model using the following
         * sample :
         * ```
         * <ers-calendar ng-model="myController.myDate"></ers-calendar>
         * ```
         *
         *
         */
        ngModel: Date;
        /**
         * You can use <a href="https://docs.angularjs.org/api/ng/directive/ngReadonly">ngReadonly</a>
         * in order to flag the component as being read only.<br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" ng-readonly="false"></ers-calendar>```
         *
         * @type {boolean}
         */
        ngReadonly: boolean;
        /**
         * You can use flag in order to set the component as being ready to submit only
         * if the user entered a valid data.<br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" ng-required="false"></ers-calendar>```
         *
         * @type {boolean}
         */
        ngRequired: boolean;
        /**
         * In order to protect the component. This flag let you forbid the user to change the value
         * but still letting you as a developer to change the value using the API.<br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" ng-disabled="false"></ers-calendar>```
         *
         * @type {boolean}
         */
        ngDisabled: boolean;
        /**
         * You can specify the desired date format using the standard angular formatting specification concerning dates
         * like describe here : https://docs.angularjs.org/api/ng/filter/date<br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" date-format="yyyy/MM/dd"></ers-calendar>```
         *
         * @type {string}
         */
        dateFormat: string;
        /**
         * You can specify an minimum date below which the user will not be able to select a date using
         * the component. If the ngModel is setted below this provided minimal date, the ngModel will
         * be flagged as being invalid! <br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" min-date="new Date()"></ers-calendar>```
         */
        minDate: Date;
        /**
         * You can specify an max date above which the user will not be able to select a date using
         * the component. If the ngModel is setted above this provided max date, the ngModel will
         * be flagged as being invalid!<br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" max-date="new Date()"></ers-calendar>```
         */
        maxDate: Date;
        /**
         * You can use this attributs in order to customize the clear text button. <br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" clear-text="reset"></ers-calendar>```
         *
         * @type {string}
         */
        clearText: string;
        /**
         * You can use this attributs in order to customize the close text button. <br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" close-text="close"></ers-calendar>```
         *
         * @type {string}
         */
        closeText: string;
        /**
         * You can use this attributs in order to customize the current text button. <br />
         *
         *  ### Example<br />
         * ```<ers-calendar ng-model="myModel" current-text="Today"></ers-calendar>```
         *
         * @type {string}
         */
        currentText: string;
        /**
         * You customize the calendar component in order to show a button bar letting the user
         * to show eighter today's date or clear your choice. You will also have a cancel
         * button letting you close the pickup window
         * @type {boolean}
         */
        showButtonBar: boolean;
        /**
         * CSS class name specified in calendar.scss for the disable styling
         */
        static CSS_DISABLED_CLASS_NAME: string;
        /**
         * CSS class name specified in calendar.scss for the readonly styling
         */
        static CSS_READ_ONLY_CLASS_NAME: string;
        /**
         * CSS class name specified in calendar.scss for the required styling
         * @type {string}
         */
        static CSS_REQUIRED_CLASS_NAME: string;
        /**
         * Track the opened status of the calendar
         * @type {boolean}
         */
        popupOpened: boolean;
        /**
         * the NG Model Controller attach to the directive
         */
        private inputModelCtrl;
        /**
         * Attributes of the directive. For intenal use only.
         */
        private attributes;
        /**
         * @private
         *
         * The element to which this directive is linked.
         */
        protected element: ng.IAugmentedJQuery;
        /**
         * Validation manager service. Used to register current controller as an IValidationTarget instance
         */
        private vm;
        /** $timeout service.*/
        private $timeout;
        /** $exception handler service*/
        private $exceptionHandler;
        /**
         * List of resources to inject into the controller by Angular
         * @type {string[]}
         */
        static $inject: string[];
        /**
         * In order to use this Controller, you must have an ngModel
         * specified in your scope
         * @param $scope implementing ICalendarScope
         * @param element
         * @param attributes
         */
        constructor($scope: ICalendarScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes, vm: IValidationManager, $timeout: ng.ITimeoutService, $exceptionHandler: ng.IExceptionHandlerService);
        private init();
        /**
         * return only the scope used by the directive as an ICalendarScope
         * @returns {ICalendarScope}
         */
        getScope(): ICalendarScope;
        /**
         * You <strong>MUST</strong> use this method and set the controller before using
         * this controller. Otherwise, you'll encounter an 'undefined' error.
         * @param inputModelCtrl
         */
        setNgModelController(ctrl: ng.INgModelController): void;
        /**
         * Manipulate the DOM. Adding `ers-calendar` class to the directive. Setting up the observer
         */
        link(scope: ICalendarScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes): void;
        /**
         * Whenever a user click on the calendar component, this method is fired and
         * set the <code>popupOpened</code> boolean to true.
         * The method can be called without the event parameter.
         * This method will check the <b>readonly</b> && <b>disabled</b> properties and switch the
         * the component state only if it can do it
         * @param $event optional parameter of the mouse event associated with the action
         */
        showPopup($event?: JQueryEventObject): void;
        /**
         * Settup all need listeners
         */
        private setListeners();
        /**
         * For internal usage only. This method set watchers on appropriate attributes.
         * If any of those attributes evolve, the state of the component is checked
         * and the view will be updated to correspond to the new state
         */
        private setWatchers();
        /**
         * Observe attributes of ers-calendar:<br>
         * <code>disabled</code> in order to know if the related class is needed
         * <code>readonly</code> in order to know if the related class is needed
         * <code>required</code> in order to know if the related class is needed
         * <br />
         *
         * Be aware that if any of the above attributes change, a validation process
         * attach to the ngModel is launched!
         */
        private setObserver();
        /**
         * If the required conditions are ok, this function will return true
         * @returns {boolean}
         */
        private checkRequired();
        inputElement(): ng.IAugmentedJQuery;
        validationRules(): IValidationRule[];
        ngModelController(): ng.INgModelController;
        /**
         * @returns {string} Returns the ID attribute of the current component.
         */
        id(): string;
    }
}


/**
 * Created by GunduzB on 2/17/2015.
 */
/**
 * TypeScript module for the `<ers-calendar>` directive. Take a look on the [[CalendarController]] for more
 * information and for usage details.
 */
declare module ers.components.calendar {
    class CalendarModule {
        static NG_MODULE_NAME: string;
        static NG_DEPENDENCIES: string[];
        static DIRECTIVE_NAME: string;
    }
}


/**
 * @ngdoc directive
 * @module ers.components.calendar
 * @name ersCalendar
 * @restrict E
 *
 * @description
 *
 * Use the `ers-calendar` component to display a date picker and/or compute date values.
 *
 * <div style="margin: 30px;">
 *   <ers-calendar ng-model="date" title="Click here to open a calendar"></ers-calendar>
 * </div>
 *
 * The calendar component requires that `ngModel` pass a date value as an attribute.
 *
 * More specific information is available from <a href="https://docs.angularjs.org/api/ng/directive/ngModel"
 * target="_blank">Angular on the ngModel</a>.
 *
 *Review additional information in the CSS classes for help regarding  "validity" and how Angular handles
 * modifying the model.
 *
 *
 * Use `<a href="https://docs.angularjs.org/api/ng/directive/ngReadonly" target="_blank">
 * ngReadonly</a>` to flag the calendar as read only.
 *
 *
 * ####Visual Design Guidelines
 * There are no specific visual design guidelines for `ers-calendar`.
 *
 *
 *
 * #### Examples
 *
 * The following example displays the code from the description display:
 *
 * ```xml
 * <div style="margin: 30px;">
 *   <ers-calendar ng-model="date" title="Click here to open a calendar"></ers-calendar>
 * </div>
 * ```
 *
 *
 *
 *
 *
 *
 * Consider the following examples of `ers-calendar`:
 *
 * - Standard calendar using a controller.
 * ```xml
 * <ers-calendar ng-model="myController.myDate"></ers-calendar>
 * ```
 *
 * - Calendar marked read-only using `ngReadonly`.
 * ```xml
 * <ers-calendar ng-model="myModel" ng-readonly="true"></ers-calendar>
 * ```
 *
 *
 *
 *
 *
 * @param {string} ng-model
 *
 * Passes a valid date as an attribute.
 *
 * @param {boolean} [ng-readonly]
 *
 * Binds the data when the component is set to readonly.
 *
 * ```xml
 * <ers-calendar ng-model="myModel" ng-readonly="true"></ers-calendar>
 * ```
 *
 * @param {boolean} [ng-disabled=true]
 *
 * Sets the `disabled` flag to true.
 *
 * @param {string} [date-format]
 * Sets the date format. *For example*, in yyyy/MM/dd, 'yyyy' is the fully qualified year, 'MM' is the two digit month, and 'dd' is the
 * two digit day. ```<ers-calendar ng-model="myModel" date-format="yyyy/MM/dd"></ers-calendar>```
 *
 * @param {string} [min-date]
 *
 * Sets the minimum date the user can choose.
 *
 * ```xml
 * <ers-calendar ng-model="myModel" min-date="new Date()"></ers-calendar>
 * ```
 *
 *
 * @param {string} [max-date]
 *
 * Sets the maximum date the user can choose.
 *
 * ```xml
 * <ers-calendar ng-model="myModel" max-date="new Date()"></ers-calendar>
 * ```
 *
 * @param {string} [current-text]
 *
 * Sets the current text on a button.
 *
 * ```xml
 * <ers-calendar ng-model="myModel" current-text="Today"></ers-calendar>
 * ```
 *
 * @param {string} [closeText]
 *
 * Sets the text on the closing button.
 *
 * ```xml
 * <ers-calendar ng-model="myModel" close-text="close"></ers-calendar>
 * ```
 *
 * @param {string} [clearText]
 *
 * Sets the text on the clear button.
 *
 * ```xml
 * <ers-calendar ng-model="myModel" clear-text="reset"></ers-calendar>
 * ```
 * @param {boolean} show-button-bar="true" Sets whether or not to display the button bar. The default is false.
 *
 * ```xml
 * <ers-calendar
 *     ng-model=myController.selectedDate"
 *     show-button-bar="true">
 *     </ers-calendar>
 *  ```
 *
 *  Use a controller to pass a variable to the `show-button-bar`.
 *
 *  ```xml
 *  <ers-calendar
 *      ng-model=myController.selectedDate"
 *      show-button-bar="myController.showButtonBar">
 *      </ers-calendar>
 *  ```
 *
 *
 *
 */
declare module ers.components.calendar {
}


declare module ers.components.core {
    /**
     * Base component for all components.
     */
    class BaseComponent {
        /**
         * The element to which this directive is linked.
         */
        protected $element: ng.IAugmentedJQuery;
        /** Angular timeout service. Currently used to execute a function when the model controller is fully loaded. */
        protected $timeout: ng.ITimeoutService;
        /** Disabled component property. */
        protected _disabled: boolean;
        /**
         * This method is to be called by classes that extend BaseComponent. You should never create an instance of this
         * class directly.
         *
         * @param $element The component element.
         * @param $timeout Angular timeout service. Currently used to execute a function when the model controller is fully loaded.
         */
        constructor($element?: ng.IAugmentedJQuery, $timeout?: ng.ITimeoutService);
        /**
         * This function configure the ERS focus detection in order to set the "ers-focus" CSS class on the current directive
         * when the component get the focus, and then to remove this CSS class when the component loses the focus.
         * I made this trick because is not easy to play with the focus state in CSS when the focus in/out is not applied directly
         * on the directive component but in a wrapped input.
         */
        private configureERSFocusDetection();
        /**
         * @returns {boolean} Returns true if the component is disabled, false otherwise.
         */
        /**
         * Set the disabled state for this current component.
         * @param value The new disabled state for this component.
         */
        ngDisabled: boolean;
    }
}




declare module ers.components.changePassword {
    /**
     * @ngdoc directive
     * @module ers.components.changePassword
     * @name ersChangePassword
     * @restrict E
     *
     * @description
     *
     * Use the `ers-changePassword` component in conjunction with the login component to change
     * passwords when needed or required. This is a simple form that can be applied to a button, or
     * added to a form. It is typically used used with
     * a login dialog. The following example shows the component added to a simple button.
     *
     * <div class="wrapper">
     *     <ers-button ng-click="demoCtrl.changePasswordDemo()">Change password</ers-button>
     *  </ers-login>
     * </div>
     *
     *
     *
     * <!--
     * <styles>
     *     #ersChangePasswordBasicUsageDemo .wrapper {
     *     width:300px;
     *     }
     *  </styles>
     *  <script>
     *
     *      function DemoCtrl($scope, ersModalService) {
     *         this.modalService = ersModalService;
     *         this.changePasswordDemo = function(){
     *           var modalOptions = {
     *             okText: "Ok",
     *             instanceTemplate: "demos/ersChangePassword/basicUsage/template.html",
     *             title: "Change password"
     *
     *      };
     *      this.modalService.customDialog(modalOptions);}
     *
     *      }
     *      DemoCtrl.$inject=["$scope","ersModalService"];
     *
     *
     *   </script>
     *
     * <c-markdown strip-leading-whitespace>
     *
     *
     *
     *
     * <!--The following demonstrates how to create a basic change password component.
     *
     *   </doc-markdown>
     *   <div class="wrapper">
     *       <ers-button ng-click="demoCtrl.changePasswordDemo()">Change password</ers-button>
     *       </div>
     *
     *
     *
     *  //-->
     *
     * ####Visual Design Guidelines
     *
     * `ers-changePassword` is a simple form that does not require visual design. A simple link
     * triggers the dialog. Use this component with [ers-login](#/components/ersLogin/documentation),
     * or as a stand-alone modal dialog for changing passwords for users already logged in.
     *
     *
     * #### Examples
     * The following example displays the code from the description display:
     *
     *
     * ```xml
     *
     *    <ers-button
     *    ng-click="demoCtrl.changePasswordDemo()">Change password
     *
     *    </ers-button>
     * ```
     *
     *
     *
     *
     * @param {string} [confirmNewPassword]
     * Sets the new password confirmation dialog.
     *
     * @param {string} [database]
     * Defines the database to which the application is attached.
     *
     * @param {string} [newPassword]
     * Sets the new password.
     *
     * @param {string} [oldPassword]
     * Expects the current password.
     *
     * @param {string} [username]
     * Expects the user name associated with oldPassword.
     */
    class ChangePasswordComponent extends ers.components.core.BaseComponent {
        /**
         * the selected database.
         */
        database: string;
        /**
         * the user name.
         */
        username: string;
        /**
         *  true if [username](#username) is pre-filled.
         */
        usernameInitialized: boolean;
        /**
         * the current password.
         */
        oldPassword: string;
        /**
         * the new password.
         */
        newPassword: string;
        /**
         * the new password confirmation.
         */
        confirmNewPassword: string;
        static $inject: string[];
        /**
         * Constructor:
         */
        constructor($element?: ng.IAugmentedJQuery);
    }
}

/**
 * @author BERTHETO
 * ERS Angular Controller : ModalController.
 */
declare module ers.components.modal {
    /**
     *
     * Controller associated to the modal-template.
     *  This is the base controller used by the modal service.This controller is not associated to a directive.
     *  When opening a modal, it's not mandatory to have a specific
     *  controller associated to the displayed template. Indeed this controller allows to pass and return values (see the
     *  modalVariables argument of the constructor) and
     *  manages the before/on close standard events.
     *  If you have more specific operations to do on the resolved variables or specific before/on close actions, you
     *  could inherite from this contoller.
     *
     *
     *  The following are the methods available:
     *
     * ### Available Methods
     *
     * * [compareNewPasswords](#comparenewpasswords), [callChangePasswordCallback](#callchangepasswordcallback),
     * [onCloseModal](#onclosemodal), [formIsValid](#formisvalid) , [disableAllButtons](#disableAllButtons)
     */
    class ModalController extends ers.components.core.BaseController {
        /**
         * The ui.bootstrap modal instance.
         */
        modalInstance: ng.ui.bootstrap.IModalServiceInstance;
        /**
         * the html template of the modal content.
         */
        instanceTemplate: string;
        /**
         * Function triggered on the modal close.
         */
        onModalClose: Function;
        /**
         * Function triggered on the modal dismiss.
         */
        onModalDismiss: Function;
        /**
         * Function triggered before the modal close.
         * In this case, the onModalClose function is not called, it's the responsability of the onBeforeModalClose to
         * call or not the onModalClose function.
         */
        onBeforeModalClose: Function;
        /**
         * Function triggered before the modal dismiss.
         * In this case, the onModalDismiss function is not called, it's the responsability of the onBeforeModalDismiss to
         * call or not the onModalDismiss function.
         */
        onBeforeModalDismiss: Function;
        /**
         * used to display a simple message in the popup.
         */
        message: string;
        /**
         * optional size of modal window. Allowed values: 'sm' (small) or 'lg' (large).
         */
        size: string;
        /**
         * The modal title.
         */
        title: string;
        /**
         * The modal buttons.
         * Array Of IChoices binded in the modal template to create the buttons.
         */
        buttons: IChoice[];
        /**
         * true if the cross button at the top right, is visible.
         */
        dismissCrossButtonVisible: boolean;
        /**
         * true if the dialog is draggable.
         */
        private _draggable;
        /**
         * true if the dialog is resizable.
         */
        private _resizable;
        /**
         * true if the dialog is modal, false if modeless.
         */
        private _modal;
        /**
         * the dialog id.
         */
        id: number;
        /**
         * selector path to set the focus when the popup is open. This correspond to the path of an element in the modal
         * form. don't use '$' selector ! ex : ers-radio-group[name='sample.groupName']:first
         */
        focusPath: string;
        /**
         * the functionnal variables resolved and injected from the caller.
         */
        protected _modalVariables: Object;
        static $inject: string[];
        /**
         * @constructor
         * @param $scope the scope.
         * @param $modal The ui.bootstrap Modal Service.
         * @param $modalInstance The ui.bootstrap modal instance.
         * @param options The modal options to configure the modal.
         * @param modalVariables variables to be used by the modal content.
         * this properties could be retrieved in the main and functionnal modal templates by using{{ctrl.propertyName}}
         * for example, but, also by using {{ctrl.modalVariables.propertyName}}
         */
        constructor($scope: ng.IScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance, options: IModalInstanceOptions, modalVariables: Object);
        /**
         * @return true if the dialog is draggable.
         */
        draggable: boolean;
        /**
         * @return true if the dialog is resizable.
         */
        resizable: boolean;
        /**
         * @return true if the dialog is modal, false if modeless.
         */
        modal: boolean;
        /**
         * Manage the enter keypress on the buttonz
         * @param event the key event.
         */
        buttonEnter(event: Event): void;
        /**
         * Get the clicked button value.
         * @param $event the click event.
         * @return {Object} the button value.
         */
        private getButtonValue($event);
        /**
         *  Compute the return values for the close/dismiss.
         * @return {Object} the return values object.
         */
        private getReturnValues();
        /**
         *  call the before close functions and/or close the modal instance.
         *  The onModalClose is executed in the close promise (see the service).
         *  @param $event the click event.
         */
        onCloseModal($event?: Event): void;
        /**
         * call the before dismiss functions and/or dismiss the modal instance.
         *  The onModalDismiss is executed in the close promise (see the service).
         *  @param $event the click event.
         */
        onDismissModal($event?: Event): void;
        /**
         * Close the modal instance and trigger the result promise (closed).
         * @param closeModalResult result used by the result promise.
         */
        closeModal(closeModalResult: Object): void;
        /**
         * Destroy all the injected properties and the modal instance.
         */
        private destroy();
        /**
         *
         * Dismiss the modal instance and trigger the result promise (rejected).
         * @param pResult result used by the result promise.
         */
        dismissModal(pResult: Object): void;
        /**
         * Form validity test.
         * @return {boolean} true if the modal content form (in the urlTemplate modal type, not the message modal type)
         * is valid.
         */
        formIsValid(): boolean;
        /**
         * Form validity test.
         * @return {boolean} true if the modal content form (in the urlTemplate modal type, not the message modal type)
         * is valid.
         */
        disableAllButtons(): boolean;
        /**
         * modalVariables getter.
         * @return {Object} the functionnal variables resolved and injected from the caller.
         */
        modalVariables: Object;
    }
}


declare module ers.components.modal {
    /**
     * IChoice interface used to generate buttons in confimation/question popup.
     */
    interface IChoice {
        /**
         *  the label associated to the choice.
         */
        label: string;
        /**
         *  the choice id.
         */
        id: string;
        /**
         * used to generate the good button css class.
         */
        cssClass?: string;
        /**
         * The Ers-icon.
         */
        icon?: string;
        /**
         * the value associated to the choice.
         */
        value?: Object;
        /**
         *  true if it's an escape choice (like 'cancel').
         */
        escapeChoice?: boolean;
        /**
         * true if it's a default choice : the choice will be selected by default.
         */
        defaultChoice?: boolean;
        /**
         * true if it's a commit choice (like 'update','confirm').
         */
        commitChoice?: boolean;
    }
}


declare module ers.components.modal {
    /**
     * IModalInstanceOptions interface used to configure a modal popup.
     */
    interface IModalInstanceOptions {
        /**
         * The modal title.
         */
        title?: string;
        /**
         * optional size of modal window. Allowed values: 'sm' (small) or 'lg' (large).
         */
        size?: string;
        /**
         * additional CSS class(es) to be added to a modal window template.
         */
        windowClass?: string;
        /**
         * the modal buttons.
         */
        buttons: IChoice[];
        /**
         * true if the cross button at the top right, is visible.
         */
        dismissCrossButtonVisible?: boolean;
        /**
         * used to display a simple message in the popup.
         */
        message?: string;
        /**
         * the html template of the modal content.
         */
        instanceTemplate?: string;
        /**
         * The controller used by the modal template and the modal content template.
         */
        templateController?: Object;
        /**
         * indicates whether the dialog should be closable by hitting the ESC key, defaults to true.
         */
        keyboard?: boolean;
        /**
         * Function triggered on the modal dismiss.
         */
        onModalDismiss?: Function;
        /**
         * Function triggered on the modal close.
         */
        onModalClose?: Function;
        /**
         * Function triggered on the modal open.
         */
        onModalOpen?: Function;
        /**
         * Function triggered before the modal close.
         * In this case, the onModalClose function is not called, it's the responsability of the onBeforeModalClose to
         * call or not the onModalClose function.
         */
        onBeforeModalClose?: Function;
        /**
         * Function triggered before the modal dismiss.
         * In this case, the onModalDismiss function is not called, it's the responsability of the onBeforeModalDismiss to
         * call or not the onModalDismiss function.
         */
        onBeforeModalDismiss?: Function;
        /**
         * true if the dialog is draggable.
         */
        draggable?: boolean;
        /**
         * true if the dialog is resizable.
         */
        resizable?: boolean;
        /**
         * true if the dialog is modal, false if modeless.
         */
        modal?: boolean;
        /**
         * the dialog id.
         */
        id?: number;
        /**
         * selector path to set the focus when the popup is open. This correspond to the path of an element in the modal
         * form. don't use '$' selector ! ex : ers-radio-group[name='sample.groupName']:first
         */
        focusPath?: string;
    }
}


declare module ers.components.core {
    interface IError {
        message: string;
    }
}

declare module ers.components.core {
    interface ICredentialError extends IError {
        credentialsError: boolean;
    }
}


declare module ers.components.changePassword {
    interface IChangePasswordError extends ers.components.core.ICredentialError {
        newPasswordError: boolean;
    }
}


declare module ers.components.login {
    /**
     * ILoginInfo Interface
     * Used to transmit user informations during login.
     */
    interface ILoginInfo {
        /**
         * The User name.
         */
        username: string;
        /**
         * The User password.
         */
        password: string;
        /**
         * The database.
         */
        database: string;
    }
}

declare module ers.components.changePassword {
    interface IChangePasswordResult extends ers.components.login.ILoginInfo {
        newPassword: string;
    }
}


declare module ers.components.changePassword {
    /**
     * Interface representing the change-password scope.
     */
    interface IChangePasswordScope extends ng.IScope {
        /**
         * the user name.
         */
        username: string;
        /**
         * the current database.
         */
        database: string;
        /**
         * the old password (current password).
         */
        oldPassword: string;
        /**
         * the new password.
         */
        newPassword: string;
        /**
         * the new password confirmation.
         */
        confirmPassword: string;
    }
}


declare module ers.components.changePassword {
    interface IChangePasswordResolvedVar {
        /**
         * the user name.
         */
        username: string;
        /**
         * the selected database.
         */
        database: string;
        /**
         *  The callback function following change password action.
         *
         *  It allows to verify, call a change password service for example, before close the modal.
         *
         *  This function is triggered when 1 - user click on update in the change password modal
         *
         *  This function MUST return a promise. If an error occurs during the change password check, this promise MUST be
         *  rejected with an IChangePasswordError as argument.
         *  (ex : promise.reject({credentialsError: credentialsError, message: message,
         *  newPasswordError: newPasswordError})).
         *
         *  The callback function must respect this signature:
         *  ```typescript
         *   functionName(credentials:IChangePasswordResult):ng.IPromise<Object>  {
         *   }
         *   ```
         *   and, the attribute tag must be the same as the below example in the login component (above all the `(credentials)`):
         *  ```xml
         *  <ers-login on-change-password="myCtrl.verifyNewPassword(credentials)"></ers-login>
         *  ```
         */
        changePassword: Function;
    }
}

declare module ers.components.changePassword {
    /**
     * Controller associated to the change-password-template as a modal.
     *
     * When the change-password modal is open, the opener could pass username and database to the modal using
     * the modalVariables (injected by the ModalService).
     * By default, on the update click, the controller will check if the new passwords are equal and if it's the case,
     * call the [onChangePassword](#changepasswordfunction) callback function. If an error occur,
     * the [changePasswordError](#changepassworderror) is updated; if no error,
     * the modal is closed.
     *
     *  The following are the methods available:
     *
     * ### Available Methods
     *
     * * [compareNewPasswords](#comparenewpasswords), [callChangePasswordCallback](#callchangepasswordcallback),
     * [onCloseModal](#onclosemodal), [formIsValid](#formisvalid) , [disableAllButtons](#disableAllButtons)
     */
    class ChangePasswordModalController extends ers.components.modal.ModalController {
        /**
         * the selected database.
         */
        database: string;
        /**
         * the user name.
         */
        username: string;
        /**
         *  true if [username](#username) is pre-filled.
         */
        usernameInitialized: boolean;
        /**
         * the current password.
         */
        oldPassword: string;
        /**
         * the new password.
         */
        newPassword: string;
        /**
         * the new password confirmation.
         */
        confirmNewPassword: string;
        /**
         * true if the screen is 'computing' (call the changePassword callback).
         * @type {boolean}
         */
        computing: boolean;
        /**
         *  The callback function following change password action.
         *
         *  It allows to verify, call a change password service for example, before close the modal.
         *
         *  This function is triggered when 1 - user click on update in the change password modal
         *
         *  This function MUST return a promise. If an error occurs during the change password check, this promise MUST be
         *  rejected with an IChangePasswordError as argument.
         *  (ex : promise.reject({credentialsError: credentialsError, message: message,
         *  newPasswordError: newPasswordError})).
         *
         *  The callback function must respect this signature:
         *  ```typescript
         *   functionName(credentials:IChangePasswordResult):ng.IPromise<Object>  {
         *   }
         *   ```
         *   and, the attribute tag must be the same as the below example in the login component (above all the `(credentials)`):
         *  ```xml
         *  <ers-login on-change-password="myCtrl.verifyNewPassword(credentials)"></ers-login>
         *  ```
         */
        onChangePassword: Function;
        /**
         * the error if change password failed.
         *
         * As the controller does not manage the real change password process, if an error occurs after the
         * [onChangePassword](#onchangepassword)
         * callback,  it's the callback responsability  to update this error attribute to display the error
         * in the change password screen.
         */
        _changePasswordError: IChangePasswordError;
        static $inject: string[];
        /**
         * constructor
         * @param $scope the scope.
         * @param $modalInstance the modal instance.
         * @param options the injected ersModalService options for the change password modal
         * @param modalVariables the injected ersModalService specific variables for the change password modal.
         */
        constructor($scope: ng.IScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance, options: ers.components.modal.IModalInstanceOptions, modalVariables: IChangePasswordResolvedVar);
        /**
         *
         * @param pChangePasswordError
         */
        /**
         *
         * @param pChangePasswordError
         */
        changePasswordError: IChangePasswordError;
        /**
         * verify the new and confirmation password equality.
         * @return {boolean} true if the 2 passwords match.
         */
        compareNewPasswords(): boolean;
        /**
         * Call the change password callback and manage the error display.
         */
        callChangePasswordCallback(): void;
        /**
         * call the before/on close functions and close the modal instance.
         */
        onCloseModal(): void;
        /**
         * Form validity test.
         * @return {boolean} true if the chang password form is valid.
         */
        formIsValid(): boolean;
        /**
         * Form validity test.
         * @return {boolean} true if the modal content form (in the urlTemplate modal type, not the message modal type)
         * is valid.
         */
        disableAllButtons(): boolean;
    }
}

declare module ers.components.changePassword {
    class ChangePasswordResolvedVar implements IChangePasswordResolvedVar {
        /**
         * the user name.
         */
        username: string;
        /**
         * the selected database.
         */
        database: string;
        /**
         *  The callback function following change password action.
         *
         *  It allows to verify, call a change password service for example, before close the modal.
         *
         *  This function is triggered when 1 - user click on update in the change password modal
         *
         *  This function MUST return a promise. If an error occurs during the change password check, this promise MUST be
         *  rejected with an IChangePasswordError as argument.
         *  (ex : promise.reject({credentialsError: credentialsError, message: message,
         *  newPasswordError: newPasswordError})).
         *
         *  The callback function must respect this signature:
         *  ```typescript
         *   functionName(credentials:IChangePasswordResult):ng.IPromise<Object>  {
         *   }
         *   ```
         *   and, the attribute tag must be the same as the below example in the login component (above all the `(credentials)`):
         *  ```xml
         *  <ers-login on-change-password="myCtrl.verifyNewPassword(credentials)"></ers-login>
         *  ```
         */
        changePassword: Function;
        /**
         * the error if change password failed.
         *
         * As the controller doesn't manage the real change password process, if an error occurs after the
         * [onChangePassword](#onchangepassword)
         * callback,  it's the callback responsability  to update this error attribute to display the error
         * in the change password screen.
         */
        changePasswordError: IChangePasswordError;
        /**
         * constructor
         * @param pUsername the username
         * @param pDatabase the database
         * @param pChangePassword the change password function
         */
        constructor(pUsername: string, pDatabase: string, pChangePassword: Function);
    }
}

declare module ers.components.changePassword {
    /**
     * Interface representing the change-password options to configure the change-password screen.
     */
    interface IChangePasswordOptions {
        /**
         * true if the change-password modal could be displayed.
         * The screen change according to this parameter.
         * ```xml
         *  <ers-login is-change-password="true"></ers-login>
         *  ```
         */
        changePasswordVisible: boolean;
        /**
         * the error if change password failed.
         *
         * As the controller doesn't manage the real change password process, if an error occurs after the
         * [onChangePassword](#onchangepassword)
         * callback,  it's the callback responsability  to update this error attribute to display the error
         * in the change password screen.
         */
        changePasswordError: IChangePasswordError;
        /**
         *  The callback function following change password action.
         *
         *  It allows to verify, call a change password service for example, before close the modal.
         *
         *  This function is triggered when 1 - user click on update in the change password modal,
         *
         *  The callback function must respect this signature:
         *  ```typescript
         *   functionName(credentials:IChangePasswordResult):IChangePasswordError {
         *   }
         *   ```
         *   and, the attribute tag must be the same as the below example in the login component (above all the `(credentials)`):
         *  ```xml
         *  <ers-login on-change-password="myCtrl.verifyNewPassword(credentials)"></ers-login>
         *  ```
         */
        onChangePassword: Function;
        /**
         * the callback function following successful change password .
         *
         * It allows to get the new credentials or launch operations after the change password.
         *
         * This function is triggered when 1 - user click on update in the change password modal,
         *  2 - if [onChangePassword](#onchangepassword) succeded.
         *
         *  The callback function must respect this signature:
         *  ```typescript
         *   functionName(closeModalResult:IChangePasswordResult):void {
         *   }
         *   ```
         *   and, the attribute tag must be the same as the below example (above all the `(closeModalResult)`):
         * ```xml
         *  <ers-login on-change-password-success="myCtrl.displayNewPassword(closeModalResult)"></ers-login>
         *  ```
         */
        onChangePasswordSuccess: Function;
    }
}


declare module ers.components.chart {
    /**
     * Interface that depicts the data scope for the [[chartDirective]].
     */
    interface IChartScope extends fc.IChartConfiguration, ng.IScope {
    }
}


/**
 * Created by serpoletg on 23/03/2015.
 */
declare module ers.components.chart {
    /**
     * Chart Directive
     * Main class for the chart component directive.
     */
    class ChartController extends ers.components.core.BaseController {
        static $inject: string[];
        /** Suffix for DOM element that will contains the fc chart object. */
        private static CONTAINER_SUFFIX;
        /** Suffix to identify the fc chart object. */
        private static FC_SUFFIX;
        /** Stores definition of a fc chart : chart definition + data. */
        dataSource: Object;
        /** True if chart is ready to be displayed, used by template to apply some specific class. */
        private _ready;
        /** Id from directive. */
        private _id;
        /** Fusion Chart object instance. */
        private _chartObj;
        /** Configuration Store to be apply on fusionchart object. */
        private _fcConfig;
        private $q;
        /**
         * @constructor Default constructor.
         */
        constructor($scope: IChartScope, $q: ng.IQService);
        /**
         * Cleans the fusion chart properly. Removes event listener if any. Dispose the object. Set the internal to null.
         */
        private disposeChart();
        /**
         * Sets a value on a property of the fusion chart configuration store, if this property is not already set.
         * @param pProperty Property to set.
         * @param pValue Value to apply.
         */
        private applyProperty(pProperty, pValue);
        /**
         * Apply all default properties for the fusion chart configuration store.
         */
        private applyDefaultProperties();
        /**
         * Link function.
         * @param $scope the checkbox controller scope
         * @param element  Html element
         * @param attributes Html attribute
         */
        link($scope: IChartScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes): void;
        /**
         * Builds Fusion chart object, wait for FC library to be loaded to create instance. If a chart already exists, destroy it.
         */
        private buildChart();
        /**
         * Gets the value for id property.
         * @return string as value.
         */
        /**
         * Sets the value on id property.
         * @param pValue value to set as string.
         */
        id: string;
        /**
         * Gets the value for type property.
         * @return string as value.
         */
        /**
         * Sets the value on type property.
         * @param pValue value to set as string.
         */
        type: string;
        /**
         * Gets the value for width property.
         * @return string as value.
         */
        /**
         * Sets the value on width property.
         * @param pValue value to set as string.
         */
        width: string;
        /**
         * Gets the value for height property.
         * @return string as value.
         */
        /**
         * Sets the value on height property.
         * @param pValue value to set as string.
         */
        height: string;
        /**
         * Gets the value for definition property.
         * @return Object as value.
         */
        /**
         * Sets the value on definition property.
         * @param pValue value to set as Object.
         */
        definition: Object;
        /**
         * Gets the value for chart property.
         * @return any as value.
         */
        /**
         * Sets the value on chart property.
         * @param pValue value to set as any.
         */
        chartObj: FusionCharts;
        /**
         * Gets the value for fcConfig property.
         * @return  as value.
         */
        /**
         * Sets the value on fcConfig property.
         * @param pValue value to set as Object.
         */
        fcConfig: fc.IChartConfiguration;
        /**
         * Gets the value for ready property.
         * @return boolean as value.
         */
        /**
         * Sets the value on ready property.
         * @param pValue value to set as boolean.
         */
        ready: boolean;
        /**
         * Gets the value for containerBackgroundColor property.
         * @return  as value.
         */
        /**
         * Sets the value on containerBackgroundColor property.
         * @param pValue value to set as .
         */
        containerBackgroundColor: string;
        /**
         * Gets the value for containerBackgroundOpacity property.
         * @return string as value.
         */
        /**
         * Sets the value on containerBackgroundOpacity property.
         * @param pValue value to set as string.
         */
        containerBackgroundOpacity: number;
        /**
         * Gets the value for baseChartMessageFont property.
         * @return string as value.
         */
        /**
         * Sets the value on baseChartMessageFont property.
         * @param pValue value to set as string.
         */
        baseChartMessageFont: string;
        /**
         * Gets the value for baseChartMessageFontSize property.
         * @return number as value.
         */
        /**
         * Sets the value on baseChartMessageFontSize property.
         * @param pValue value to set as number.
         */
        baseChartMessageFontSize: number;
        /**
         * Gets the value for baseChartMessageColor property.
         * @return string as value.
         */
        /**
         * Sets the value on baseChartMessageColor property.
         * @param pValue value to set as string.
         */
        baseChartMessageColor: string;
        /**
         * Gets the value for renderErrorMessage property.
         * @return boolean as value.
         */
        /**
         * Sets the value on renderErrorMessage property.
         * @param pValue value to set as boolean.
         */
        renderErrorMessage: boolean;
        /**
         * Gets the value for showChartLoadingMessage property.
         * @return boolean as value.
         */
        /**
         * Sets the value on showChartLoadingMessage property.
         * @param pValue value to set as boolean.
         */
        showChartLoadingMessage: boolean;
        /**
         * Gets the value for showDataLoadingMessage property.
         * @return boolean as value.
         */
        /**
         * Sets the value on showDataLoadingMessage property.
         * @param pValue value to set as boolean.
         */
        showDataLoadingMessage: boolean;
        /**
         * Gets the value for loadMessage property.
         * @return string as value.
         */
        /**
         * Sets the value on loadMessage property.
         * @param pValue value to set as string.
         */
        loadMessage: string;
        /**
         * Gets the value for typeNotSupportedMessage property.
         * @return string as value.
         */
        /**
         * Sets the value on typeNotSupportedMessage property.
         * @param pValue value to set as string.
         */
        typeNotSupportedMessage: string;
        /**
         * Gets the value for dataEmptyMessage property.
         * @return string as value.
         */
        /**
         * Sets the value on dataEmptyMessage property.
         * @param pValue value to set as string.
         */
        dataEmptyMessage: string;
        /**
         * Gets the value for dataInvalidMessage property.
         * @return string as value.
         */
        /**
         * Sets the value on dataInvalidMessage property.
         * @param pValue value to set as string.
         */
        dataInvalidMessage: string;
        /**
         * Gets the value for dataLoadErrorMessage property.
         * @return string as value.
         */
        /**
         * Sets the value on dataLoadErrorMessage property.
         * @param pValue value to set as string.
         */
        dataLoadErrorMessage: string;
        /**
         * Gets the value for dataLoadStartMessage property.
         * @return string as value.
         */
        /**
         * Sets the value on dataLoadStartMessage property.
         * @param pValue value to set as string.
         */
        dataLoadStartMessage: string;
        /**
         * Gets the value for dataFormat property.
         * @return string as value.
         */
        /**
         * Sets the value on dataFormat property.
         * @param pValue value to set as string.
         */
        dataFormat: string;
        /**
         * Gets the value for events property.
         * @return Object as value.
         */
        /**
         * Sets the value on events property.
         * @param pValue value to set as Object.
         */
        events: Object;
        /**
         * Gets the value for chart property.
         * @return Object as value.
         */
        /**
         * Sets the value on chart property.
         * @param pValue value to set as Object.
         */
        chart: Object;
        /**
         * Gets the value for data property.
         * @return Object as value.
         */
        /**
         * Sets the value on data property.
         * @param pValue value to set as Object.
         */
        data: Object;
        /**
         * Generic method to apply changes in the chart definition if fc chart already instanciated.
         */
        private applyChartProperties();
        /**
         * Gets the value for dataset property.
         * @return Object as value.
         */
        /**
         * Sets the value on dataset property.
         * @param pValue value to set as Object.
         */
        dataset: Object;
        /**
         * Gets the value for linkdedata property.
         * @return Object as value.
         */
        /**
         * Sets the value on linkdedata property.
         * @param pValue value to set as Object.
         */
        linkdedata: Object;
        /**
         * Gets the value for trendlines property.
         * @return Object as value.
         */
        /**
         * Sets the value on trendlines property.
         * @param pValue value to set as Object.
         */
        trendlines: Object;
        /**
         * Gets the value for vtrendlines property.
         * @return Object as value.
         */
        /**
         * Sets the value on vtrendlines property.
         * @param pValue value to set as Object.
         */
        vtrendlines: Object;
        /**
         * Gets the value for annotations property.
         * @return Object as value.
         */
        /**
         * Sets the value on annotations property.
         * @param pValue value to set as Object.
         */
        annotations: Object;
        /**
         * Gets the value for colorrange property.
         * @return Object as value.
         */
        /**
         * Sets the value on colorrange property.
         * @param pValue value to set as Object.
         */
        colorrange: Object;
        /**
         * Gets the value for lineset property.
         * @return Object as value.
         */
        /**
         * Sets the value on lineset property.
         * @param pValue value to set as Object.
         */
        lineset: Object;
        /**
         * Gets the value for axis property.
         * @return Object as value.
         */
        /**
         * Sets the value on axis property.
         * @param pValue value to set as Object.
         */
        axis: Object;
        /**
         * Gets the value for connectors property.
         * @return Object as value.
         */
        /**
         * Sets the value on connectors property.
         * @param pValue value to set as Object.
         */
        connectors: Object;
        /**
         * Gets the value for pointers property.
         * @return Object as value.
         */
        /**
         * Sets the value on pointers property.
         * @param pValue value to set as Object.
         */
        pointers: Object;
        /**
         * Gets the value for value property.
         * @return Object as value.
         */
        /**
         * Sets the value on value property.
         * @param pValue value to set as Object.
         */
        value: Object;
        /**
         * Gets the value for processes property.
         * @return Object as value.
         */
        /**
         * Sets the value on processes property.
         * @param pValue value to set as Object.
         */
        processes: Object;
        /**
         * Gets the value for tasks property.
         * @return Object as value.
         */
        /**
         * Sets the value on tasks property.
         * @param pValue value to set as Object.
         */
        tasks: Object;
        /**
         * Gets the value for rows property.
         * @return Object as value.
         */
        /**
         * Sets the value on rows property.
         * @param pValue value to set as Object.
         */
        rows: Object;
        /**
         * Gets the value for columns property.
         * @return  as value.
         */
        /**
         * Sets the value on columns property.
         * @param pValue value to set as .
         */
        columns: Object;
        /**
         * Gets the value for map property.
         * @return Object as value.
         */
        /**
         * Sets the value on map property.
         * @param pValue value to set as Object.
         */
        map: Object;
        /**
         * Gets the value for markers property.
         * @return Object as value.
         */
        /**
         * Sets the value on markers property.
         * @param pValue value to set as Object.
         */
        markers: Object;
        /**
         * Gets the value for categories property.
         * @return Object as value.
         */
        /**
         * Sets the value on categories property.
         * @param pValue value to set as Object.
         */
        categories: Object;
        /**
         * Gets the value for baseChartMessageImageHAlign property.
         * @return string as value.
         */
        /**
         * Sets the value on baseChartMessageImageHAlign property.
         * @param pValue value to set as string.
         */
        baseChartMessageImageHAlign: string;
        /**
         * Gets the value for baseChartMessageImageVAlign property.
         * @return string as value.
         */
        /**
         * Sets the value on baseChartMessageImageVAlign property.
         * @param pValue value to set as string.
         */
        baseChartMessageImageVAlign: string;
        /**
         * Gets the value for baseChartMessageImageAlpha property.
         * @return number as value.
         */
        /**
         * Sets the value on baseChartMessageImageAlpha property.
         * @param pValue value to set as number.
         */
        baseChartMessageImageAlpha: number;
        /**
         * Gets the value for baseChartMessageImageScale property.
         * @return number as value.
         */
        /**
         * Sets the value on baseChartMessageImageScale property.
         * @param pValue value to set as number.
         */
        baseChartMessageImageScale: number;
        /**
         * Gets the value for containerClassName property.
         * @return string  as value.
         */
        /**
         * Sets the value on containerClassName property.
         * @param pValue value to set as string .
         */
        containerClassName: string;
        /**
         * Gets the value for link property.
         * @return fc.IChartLink as value.
         */
        /**
         * Sets the value on link property.
         * @param pValue value to set as fc.IChartLink.
         */
        linked: fc.IChartLink | fc.IChartLink[];
        /**
         * Builds a specific id for DOM el in the template. The fusion charts object will directly refer to this DOM ID.
         * @return {string} ID.
         */
        getContainerId(): string;
        /**
         * Builds a specific id for js fusion chart instance.
         * @return {string} ID.
         */
        getFusionChartId(): string;
    }
}

declare module ers.components.chart {
    class ChartModule {
        static MODULE_NAME: string;
        static DEPENDENCIES: string[];
        static DIRECTIVE_NAME: string;
    }
}

declare module ers.components.chart {
}


declare module ers.components.checkbox {
    /**
     * Interface that depicts the data scope for the [[checkboxDirective]].
     */
    interface ICheckboxScope extends ng.IScope {
        /** Checkbox model. */
        ngModel: string;
        /** Disable/Enable checkbox state. */
        ngDisabled: boolean;
        /** Required checkbox state. */
        ngRequired: boolean;
        /** Readonly checkbox state. */
        ngReadonly: boolean;
        /** Checkbox custom true/false values. */
        ngTrueValue: string;
        ngFalseValue: string;
        /** Component validity. */
        isValid: Function;
        /** Checkbox' state. */
        isChecked: Function;
        /** Mouse click trigger. */
        onClick: Function;
    }
}

/**
 * Created by germonneauf on 28/01/2015.
 */
/**
 * Interface for checkbox.
 */
declare module ers.components.checkbox {
    interface ICheckboxModel {
        /**
         * The boolean value of the check state.
         */
        cbModel: string;
        /**
         * Accessor to the check state.
         */
        checked: () => boolean;
        required: () => boolean;
        disabled: () => boolean;
        readonly: () => boolean;
        setValues: (pTrue: string, pFalse: string) => void;
        setDisable: (pValue: boolean) => void;
        setRequired: (pValue: boolean) => void;
        setReadonly: (pValue: boolean) => void;
    }
    class CheckboxModel implements ICheckboxModel {
        /**
         * Specific need for the ng-model directive need to be visible.
         */
        cbModel: string;
        /** TODO protected */ cbDisable: boolean;
        /** TODO protected */ cbRequired: boolean;
        /** TODO protected */ cbReadonly: boolean;
        /** TODO protected */ trueValue: string;
        /** TODO protected */ falseValue: string;
        /**
         * Default constructor
         */
        constructor();
        setValues(pTrue: string, pFalse: string): void;
        checked(): boolean;
        required(): boolean;
        setRequired(pValue: boolean): void;
        disabled(): boolean;
        setDisable(pValue: boolean): void;
        readonly(): boolean;
        setReadonly(pValue: boolean): void;
    }
}

declare module ers.components.checkbox {
    import IValidationManager = ers.components.core.service.IValidationManager;
    import IValidationTarget = ers.components.core.service.IValidationTarget;
    import IValidationRule = ers.components.core.service.IValidationRule;
    /**
     * Checkbox Directive
     * main class for the checkbox component directive.
     */
    class CheckboxController extends ers.components.core.BaseController implements IValidationTarget {
        /** Model controller */
        private inputModelCtrl;
        /** Checkbox required state. */
        private _ngRequired;
        private _internalRequired;
        /** Checkbox readonly state. */
        private _ngReadonly;
        private _internalReadonly;
        /** Checkbox disabled state. */
        private _ngDisabled;
        private _internalDisabled;
        /** Custom true/false values. */
        private _ngTrueValue;
        private _internalTrueValue;
        private _ngFalseValue;
        private _internalFalseValue;
        /** Facility to manage DOM. */
        private divCb;
        /** Validation manager service. Used to register current controller as an IValidationTarget instance **/
        private vm;
        /** Use to manage focus sequence */
        private _tabindex;
        /**
         * List of resources to inject into the controller by Angular
         * @type {string[]}
         */
        static $inject: string[];
        /**
         * @constructor
         */
        constructor($scope: ICheckboxScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, vm: IValidationManager);
        /**
         * @function initialize checkbox options.
         */
        protected initOptions(): void;
        /**
         * Listener on mouse and keyboard events.
         */
        protected addListeners(): void;
        /**
         * @function set watchers on disabled and readonly options. Redraw checkbox when options change.
         */
        protected addWatchers(): void;
        /**
         * Set the model controller in charge of the validation of the component.
         * @param modelController
         */
        setModelController(modelController: ng.INgModelController): void;
        /**
         * Return the chekbox state.
         * @returns {boolean}
         */
        isChecked(): boolean;
        /**
         * @function Manage the focus sequence.
         */
        private setTabIndex();
        /**
         * Update DOM to modify the classes checked/unchecked.
         */
        private updateDOMChecked();
        /**
         * Update DOM to modify the class disabled.
         */
        private updateDOMDisabled();
        /**
         * Update DOM to modify the class readonly.
         */
        private updateDOMReadonly();
        /**
         * Manage key down event. Only spacebar can checked/unchecked component.
         *
         * @param keyCode the ASCII code of he key stoke
         * @param modelCtrl the model controller
         * @param $scope the scope
         */
        onKeyDown(jqEvent: JQueryEventObject): void;
        /**
         * Update the model value (toggle).
         *
         * @param modelCtrl the model controller
         * @param $scope the scope
         */
        notifyModel(): void;
        /**
         * Getter on required option
         * @returns {boolean} the actual value of required option
         */
        /**
         * Setter on required option
         * @param value the new value of required option
         */
        ngRequired: boolean;
        /**
         * Getter disabled
         * @returns {boolean} true/false if disabled or not
         */
        /**
         * Setter disabled
         * @param value new value
         */
        ngDisabled: boolean;
        /**
         * Getter readonly
         * @returns {boolean}
         */
        /**
         * Setter readonly.
         * @param value
         */
        ngReadonly: boolean;
        /**
         * Setter custom true vlaue.
         * @returns {Object}
         */
        /**
         * Getter custom true value.
         * @param value
         */
        ngTrueValue: Object;
        /**
         * Getter custom fasle value.
         * @returns {Object}
         */
        /**
         * Setter custom falsevalue.
         * @param value
         */
        ngFalseValue: Object;
        inputElement(): ng.IAugmentedJQuery;
        debugRequired(modelValue: Object): boolean;
        validationRules(): IValidationRule[];
        ngModelController(): ng.INgModelController;
        /**
         * @returns {string} Returns the ID attribute of the current component.
         */
        id(): string;
    }
}



/**
 * @author germonneauf
 * ERS Angular Directive : ers-checkbox.
 * Check Box component.
 */
declare module ers.components.checkbox {
}


declare module ers.components.combobox {
    class ComboboxItemProperties {
        /** The value store as model. */
        value: Object;
        /** The HTML item representation. */
        element: ng.IAugmentedJQuery;
        /** Item disable/enable state */
        disable: boolean;
    }
}


declare module ers.components.combobox {
    /**
     * Interface that depicts the data scope for the [[ComboxDirective]].
     */
    interface IComboboxScope extends ng.IScope {
        /** The active item. */
        ngModel: Object;
        /** Combobox disable property. */
        ngDisabled: boolean;
        /** Combobox required property. */
        ngRequired: boolean;
        /** Combobox read only property. */
        ngReadonly: boolean;
    }
}

declare module ers.components.combobox {
    import IValidationManager = ers.components.core.service.IValidationManager;
    import IValidationTarget = ers.components.core.service.IValidationTarget;
    import IValidationRule = ers.components.core.service.IValidationRule;
    /**
     * Checkbox Directive
     * main class for the combobox component directive.
     */
    class ComboboxController extends ers.components.core.BaseController implements IValidationTarget {
        /** Constant used to apply style on selected item when key down. */
        private static KEY_HOVER_CSS;
        /**
         * Constant used to give UP/DOWN direction for the keyboard navigation
         * @type {number}
         */
        private static NEXT;
        private static PREV;
        /**
         * Constant used to flag unselect object.
         * @type {number}
         */
        private static NO_SELECTION;
        /**
         * Array of item. the dropdown content.
         */
        items: Array<ComboboxItemProperties>;
        /** Dropdown disable state. */
        ngDisabled: boolean;
        /** Dropdown required state. */
        ngRequired: boolean;
        /** Dropdown readonly state. */
        ngReadonly: boolean;
        /** Model controller attached to the directive. */
        private inputModelCtrl;
        /** Popup open/close state. */
        opened: boolean;
        /** Preserve focus when a item is selected. */
        private keepFocus;
        /** Key pressed/unpressed state. */
        protected keyPressed: boolean;
        /** selected item indexe. */
        protected selectedIndex: number;
        protected currentSelection: number;
        protected prevSelectedIndex: number;
        /** Validation manager service. Used to register current controller as an IValidationTarget instance **/
        private vm;
        /** Services injection  */
        static $inject: string[];
        /**
         * @constructor
         */
        constructor($scope: IComboboxScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, vm: IValidationManager);
        /**
         * Allowed way to manipulate DOM, set watchers, ...
         * @param $scope the directive scope
         * @param $element DOM element (directive start)
         * @param $attributes DOM attributes
         */
        link($scope: IComboboxScope, $element: ng.IAugmentedJQuery, $attributes: ng.IAttributes): void;
        /**
         * Set the appropriate watchers.
         *  <ul>
         *  <li>open => state of the dropdown popup</li>
         *  <li>model value => selected element</li>
         * </ul>
         *
         */
        protected addWatchers($element: ng.IAugmentedJQuery): void;
        /**
         * apply appropriate style if needed.
         *
         * @param event
         */
        onFocus(event: JQueryEventObject): void;
        /**
         * apply appropriate style if needed.
         *
         * @param event
         */
        onBlur(event: JQueryEventObject): void;
        /**
         * Add componeent event listeners.
         * @param $element root element.
         */
        protected addListeners($element: ng.IAugmentedJQuery): void;
        /**
         * Action to execute when popup window open/close
         * @param $element
         */
        private onOpenChange($element);
        /**
         * Compute andadd atribute to specify the current index of the element li.
         * This is used to set the selection.
         */
        private onComputeIndex();
        /**
         * Action to execute when selection change.
         * @param $element root element
         */
        private onSelectionChange($element);
        /**
         * Triggered event when mouse leave dropdown focus.
         * @param $event associate event
         */
        onMouseLeave(event: JQueryEventObject): void;
        /**
         * Triggered event when mouse move.
         * @param $event associate event
         */
        onMouseMove(event: JQueryEventObject): void;
        /**
         * Open/Close the dropdown popup.
         * @param $event associate event.
         */
        toggleDropdown(event: JQueryEventObject): void;
        /**
         * Manage keyboard event. Navigate through the dopdown list or select a new item if requested.
         * @param event associate event.
         */
        protected onKeyDown(event: JQueryEventObject): void;
        /**
         * Add new combobox item
         *
         * @param itemProperty item properties
         * @param $element the angular representation of an item in the popup dropdwon
         */
        onInsert(value: Object, separator: boolean, disabled: boolean, display: ng.IAugmentedJQuery, $element: ng.IAugmentedJQuery): number;
        /**
         * Action to execute when item isdeleted.
         * @param item item to delete
         */
        onDeleteItem(item: ComboboxItemProperties): void;
        /**
         * Highlight or not the indexed items
         * @param $element current element
         * @param index selected index
         * @param highlight highlight or not
         */
        private changeSelected($element, index, highlight);
        /**
         * Set the current selection to the index pointed by the mouse if exists.
         * @param element current element.
         */
        private evaluateSelection(element);
        /**
         * Set the model controller.
         * @param model the model controller.
         */
        setNgModelController(inputModelCtrl: ng.INgModelController): void;
        /**
         * Display selected item in the combobox.
         */
        private renderModel();
        /**
         * Verify if a given item belongs to the dropdown list.
         * @param item the item to check
         * @returns {boolean} true if it belongs else false.
         */
        private checkItem(value);
        /**
         * Change the model with the givent item. Respecting the dropdown editing conditions.
         * @param item the new model value
         */
        setSelectedItem(item: ComboboxItemProperties): void;
        /**
         * Navigate through the dropdown list.
         * @param direction up/down regarding the key pressed.
         */
        protected changeSelection(direction: number): void;
        /**
         * Return the index of first available dropdown item
         * @param start starting index.
         * @param direction up/down regarding the key pressed.
         * @returns {number} the index of the new selected item.
         */
        private availableItem(start, direction);
        inputElement(): ng.IAugmentedJQuery;
        validationRules(): IValidationRule[];
        ngModelController(): ng.INgModelController;
        /**
         * @returns {string} Returns the ID attribute of the current component.
         */
        id(): string;
    }
}



declare module ers.components.combobox {
    /**
     * Interface that depicts the data scope for the [[itemComboxDirective]].
     */
    interface IComboboxItemScope extends ng.IScope {
        /** Item disable/enable state. */
        ngDisabled: boolean;
        /** Item combobox value. */
        value: Object;
    }
}


/**
 * Created by germonneauf on 25/02/2015.
 */
declare module ers.components.combobox {
}

declare module ers.components.combobox {
    /**
     * Item Combobox Directive
     * main class for item's combobox component directive.
     */
    class ComboboxItemController extends ers.components.core.BaseController {
        interpolate: ng.IInterpolateProvider;
        static $inject: string[];
        /** Item properties */
        protected mSeparator: boolean;
        /** Disabled */
        protected ngDisabled: boolean;
        item: Object;
        /**
         * Constructor
         *
         * @param $scope
         */
        constructor($scope: IComboboxItemScope, $interpolate: ng.IInterpolateService);
        /**
         * Setter.
         *
         * @param sep
         */
        setSeparator(sep: boolean): void;
        /**
         * Getter.
         *
         * @returns {boolean}
         */
        separator(): boolean;
        disabled(): boolean;
    }
}


declare module ers.components.combobox {
}


declare module ers.components.combobox {
}

/**
 * Created by zhangfa on 6/8/2015.
 */
declare module ers.components.contextmenu {
    /**
     * The interface of context menu item model
     */
    interface IMenuItem {
        /**
         * Label of the menu item.
         * Can be a string constant or function that receives the context and returns a string
         * If it's a function, it will be executed every time when context scope changes
         */
        label: string | ((context?: Object) => string);
        /**
         * Name of the icon, must be one of the available names listed in [[IconComponent]]
         * Can be a string constant or function that receives the context and returns a string
         * If it's a function, it will be executed every time when context scope changes
         */
        icon?: string | ((context?: Object) => string);
        /**
         * A flag indicating if the item can be clicked or not.
         * Can be a boolean constant or a function that receives the context and returns a boolean
         * If it's a function, it will be executed every time when context scope changes
         */
        enabled?: boolean | ((context?: Object) => boolean);
        /**
         * A flag indicating if the item is visible or not.
         * Can be a boolean constant or a function that receives the context and returns a boolean
         * If it's a function, it will be executed every time when context scope changes
         */
        visible?: boolean | ((context?: Object) => boolean);
        /**
         * Action that will be executed when item clicked
         * @param context The scope of host element
         * @param event The mouse click event
         */
        action: (context: Object, event: JQueryEventObject) => void;
        /**
         * A flag indicating if the item has a divider before.
         */
        separatorBefore?: boolean;
        /**
         * Sub menu items. If not empty, a sub menu will be popped when this item is hovered.
         */
        children?: IMenuItem[];
    }
}

/**
 * Created by zhangfa on 6/8/2015.
 */
declare module ers.components.contextmenu {
    /**
     * Interface of a context menu instance
     */
    interface IContextMenu {
        /**
         * Set the host element of the context menu.
         * The bound context menu will show when "contextmenu" event of the host element triggered.
         *
         * @param host The host element that context menu is bound to.
         *
         * @Returns The context menu instance itself.
         */
        bindTo(host: ng.IAugmentedJQuery): IContextMenu;
        /**
         * @Returns Host element the context menu is bound to.
         */
        host(): ng.IAugmentedJQuery;
        /**
         * @Returns Menu items of the context menu
         */
        menuItems(): IMenuItem[];
        /**
         * Specify the type of event by which the context is triggered to show.
         *
         * @param trigger The type of event by which the context is triggered to show.
         *
         * @Returns The context menu instance itself.
         */
        triggeredBy(trigger: string): IContextMenu;
        /**
         * Specify whether only one context menu can be displayed at a time.
         *
         * @param exclusively True yes, false no.
         *
         * @Returns The context menu instance itself.
         */
        showExclusively(exclusively: boolean): IContextMenu;
        /**
         * Specify the container element the context menu element will be appended to.
         * If not specified any, the container will be HTML Body by default.
         * If specified with 'self', the container will be the host element.
         *
         * @param container The contain element or its selector
         */
        appendTo(container: string | JQuery): IContextMenu;
        /**
         * Called to destroy the context menu instance.
         * After destroyed, the event listener bound to host element will be removed.
         */
        destroy(): void;
    }
}

/**
 * Created by ZhangFa on 6/13/2015.
 */
declare module ers.components.contextmenu {
    /**
     * The interface of anchored context menu instance.
     *
     * Anchored context menu is a special context menu that will only popup aside a
     * [[ersContextMenuLink]] directive rather than the mouse right click point.
     */
    interface IAnchoredContextMenu extends IContextMenu {
        /**
         * Specifies the drop position of the context menu to relative to host element.
         * The available values are:  "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *                  "left", "left-top", "left-bottom", "right", "right-bottom", "right-top"
         * Refer to [[IPlacementService]].
         *
         * @Returns The anchored context menu instance itself.
         */
        withPlacement(palcement: string): IAnchoredContextMenu;
    }
}

/**
 * Created by zhangfa on 6/10/2015.
 */
declare module ers.components.contextmenu {
    /**
     * The bound menu item in [[IContextMenuScope]]
     */
    interface IBindMenuItem {
        label: string;
        icon: string;
        enabled: boolean;
        visible: boolean;
        separatorBefore: boolean;
        onClick: (e: JQueryEventObject) => void;
        children: IBindMenuItem[];
    }
    /**
     * The scope of context menu instance, used for representation.
     */
    interface IContextMenuScope extends ng.IScope {
        screenHeight: number;
        onKeyDown: (e: JQueryEventObject) => void;
        menuItems: IBindMenuItem[];
    }
}

/**
 * Created by zhangfa on 6/8/2015.
 */
declare module ers.components.contextmenu {
    /**
     * Interface of "contextMenuService".
     * Used to create a [[IContextMenu]] or [[IAnchoredContextMenu]] instance.
     *
     */
    interface IContextMenuService {
        /**
         * Create a [[IContextMenu]] instance with specified menu items.
         *
         * @param items The menu items that context menu to create should contain.
         *
         * @Returns The created [[IContextMenu]] instance.
         */
        createContextMenu(items: IMenuItem[]): IContextMenu;
        /**
         * Create a [[IAnchoredContextMenu]] instance with specified menu items.
         *
         * @param items The menu items that anchored context menu to create should contain.
         *
         * @Returns The created [[IAnchoredContextMenu]] instance.
         */
        createAnchoredContextMenu(items: IMenuItem[]): IAnchoredContextMenu;
    }
}

/**
 * The Context Menu Component Module
 *
 * Created by zhangfa on 6/8/2015.
 */
declare module ers.components.contextmenu {
    var _module: ng.IModule;
}


/** Created by BERTHETO on 27/01/2015.
 * The ICompilable Interface.
 */
declare module ers.components.core {
    interface ICompilable {
        compile: (element: ng.IAugmentedJQuery, linkFn: (scope: ng.IScope, el: ng.IAugmentedJQuery, attr: ng.IAttributes) => void) => void;
    }
}




declare module ers.components.file {
    /**
     * IDropEvent Interface representing the Jquery drop event.
     */
    interface IDropEvent extends JQueryMouseEventObject {
        originalEvent: DragEvent;
    }
}


declare module ers.components.file {
    /**
     * IFileInput Interface representing the html file input.
     */
    interface IFileInput extends EventTarget {
        files: FileList;
    }
}


declare module ers.components.file {
    /**
     * IFileItem Interface representing a file item.
     */
    interface IFileItem {
        /**
         * the file.
         */
        file: File;
        /**
         * the upload progress
         */
        uploadProgress?: number;
        /**
         * true if the file is ready to upload
         */
        isReadyToUpload?: boolean;
        /**
         * true if the file is ready to upload
         */
        isUploading?: boolean;
        /**
         * true if the file is uploading
         */
        isUploaded?: boolean;
        /**
         * true if the file is uploaded
         */
        isUploadSuccess?: boolean;
        /**
         * true if the file is uploaded with success
         */
        isUploadCanceled?: boolean;
        /**
         * true if the uploading is canceled
         */
        isUploadError?: boolean;
        /**
         * true if an error occur during the upload
         */
        uploadError?: string;
        /**
         * true if the file must be removed after the upload
         */
        removeAfterUpload?: boolean;
        /**
         * the xhr transport for the upload.
         */
        xhrTransport?: XMLHttpRequest;
        /**
         * @return true if the upload has begun
         */
        uploadHasBegun?(): boolean;
        /**
         * Inner callback on the before upload phase
         */
        _onBeforeUpload?(): void;
        /**
         * Inner callback on the progress phase
         * @param pProgress the upload progress.
         * @private
         */
        _onUploadProgress?(pProgress: number): void;
        /**
         * Inner callback on the success phase
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         * @private
         */
        _onUploadSuccess?(response: string, status: number, headers: {}): void;
        /**
         * Inner callback on the error phase
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         * @private
         */
        _onUploadError?(response: string, status: number, headers: {}): void;
        /**
         * Inner callback on the cancel phase
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         * @private
         */
        _onUploadCancel?(response: string, status: number, headers: {}): void;
        /**
         * Inner callback on the complete upload phase
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         * @private
         */
        _onUploadComplete?(response: string, status: number, headers: {}): void;
        /**
         * call during the destroy phase.
         */
        destroy?(): void;
        /**
         * prepare the file to be uploaded
         */
        prepareToUploading?(): void;
        /**
         * abortUpload the upload.
         */
        abortUpload?(): void;
    }
}

declare module ers.components.file {
    /**
     * IFileFilter Interface representing a filter to be applied when file selection occurs.
     */
    interface IFileFilter {
        /**
         * the filter name.
         */
        filterName: string;
        /**
         * the function filter : must return a ng.IPromise.
         * fn is a promise which is resolved if the file is not rejected
         * by the filter or rejected in the other case.
         */
        fn: (file?: IFileItem, currentFileIndex?: number) => ng.IPromise<Object>;
        /**
         * the function returning an error message (string) if filter fails. this is a function to be able to use variables.
         */
        errorMessage: Function;
    }
}


declare module ers.components.file {
    /**
     * ISelectFileError Interface representing the select file error.
     */
    interface ISelectFileError {
        /**
         * the file name.
         */
        file: string;
        /**
         * the error message.
         */
        message: string;
        /**
         * The filter name.
         */
        filter: string;
    }
}


declare module ers.components.file {
    /**
     * FileItem class : a File wrapper to manage file operations, upload, selection.
     */
    class FileItem implements ers.components.file.IFileItem {
        /**
         * the file.
         */
        file: File;
        /**
         * the upload progress
         */
        uploadProgress: number;
        /**
         * true if the file is ready to upload
         */
        isReadyToUpload: boolean;
        /**
         * true if the file is ready to upload
         */
        isUploading: boolean;
        /**
         * true if the file is uploading
         */
        isUploaded: boolean;
        /**
         * true if the file is uploaded
         */
        isUploadSuccess: boolean;
        /**
         * true if the file is uploaded with success
         */
        isUploadCanceled: boolean;
        /**
         * true if the uploading is canceled
         */
        isUploadError: boolean;
        /**
         * true if an error occur during the upload
         */
        uploadError: string;
        /**
         * true if the file must be removed after the upload
         */
        removeAfterUpload: boolean;
        /**
         * the xhr transport for the upload.
         */
        xhrTransport: XMLHttpRequest;
        /**
         * @constructor
         * @param pFile the file.
         */
        constructor(pFile: File);
        /**
         * Inner callback on the before upload phase
         */
        _onBeforeUpload(): void;
        /**
         * Inner callback on the progress phase
         * @param pProgress the upload progress.
         * @private
         */
        _onUploadProgress(progress: number): void;
        /**
         * Inner callback on the success phase
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         * @private
         */
        _onUploadSuccess(response: string, status: number, headers: {}): void;
        /**
         * Inner callback on the error phase
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         * @private
         */
        _onUploadError(response: string, status: number, headers: {}): void;
        /**
         * Inner callback on the cancel phase
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         * @private
         */
        _onUploadCancel(response: string, status: number, headers: {}): void;
        /**
         * Inner callback on the complete upload phase
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         * @private
         */
        _onUploadComplete(response: string, status: number, headers: {}): void;
        /**
         * call during the destroy phase.
         */
        destroy(): void;
        /**
         * prepare the file to be uploaded
         */
        prepareToUploading(): void;
        /**
         * abortUpload the upload.
         */
        abortUpload(): void;
        /**
         * @return true if the upload has begun
         */
        uploadHasBegun(): boolean;
    }
}


declare module ers.components.file {
    /**
     * IUploadStatus Interface representing the upload status.
     */
    interface IUploadStatus {
        /**
         * total files to be uploaded.
         */
        toBeUploaded?: number;
        /**
         * files number currently uploading
         */
        uploading?: number;
        /**
         * Headers to be sent along with the files.
         */
        uploaded?: number;
        /**
         * Data to be sent along with the files.
         */
        failed?: number;
        /**
         * total uploading progress.
         */
        progress?: number;
    }
}

declare module ers.components.file {
    /**
     * IUploadOptions Interface representing the upload options.
     */
    interface IUploadOptions {
        /**
         * Path on the server to upload files.
         */
        url: string;
        /**
         * Headers to be sent along with the files.
         */
        headers?: Object;
        /**
         * Data to be sent along with the files.
         */
        formData?: Object[];
        /**
         * Automatically upload files after adding them to the queue
         */
        autoUpload?: boolean;
        /**
         * It's a request method. By default POST. HTML5 browsers only.
         */
        method?: string;
        /**
         * Remove file by file from the queue after uploading the file
         */
        removeAfterUpload?: boolean;
        /**
         * Remove files from the queue after uploading all the files
         */
        removeAllAfterUpload?: boolean;
        /**
         * true if the uploads must be simultaneously
         */
        simultaneousUpload?: boolean;
        /**
         * enable CORS.
         */
        withCredentials?: boolean;
        /**
         * upload status : the differnt status concerning the upload (progress, errors...)
         */
        uploadStatus?: IUploadStatus;
        /**
         * true if the total progress must be displayed in the UI.
         */
        displayTotalProgress?: boolean;
    }
}


/**
 * Created by bertheto on 06/04/2015.
 */
declare module ers.components.file {
    /**
     * ###File component
     * #### Selector part
     * Allows to select one or more files, by direct selection or dragging way.
     * A selected file list is diplayed, files could be removed or added from/to the selection.
     *
     * A set of default filter are applied when the user select a file (extensions, types, size, number limit, ect ...).
     * But, as a user, you could add you"re own custom filters (a function returning promise.).
     *
     * Each filter is a promise which is resolved if the file is not rejected
     * by the filter or rejected in the other case.
     *
     * If a filter raises an error, the component doesn't display the error but call a callback with the error to allow
     * the user to deal with this error.
     *  An action button is available to launch an action on the selected files.
     *
     * #### Upload part
     * In uploader mode, the component allows to upload selected files, one by one or simultaneously, with progress
     * indication. The action button is configured to be the upload button. It's possible to abort an upload,
     * to remove the files after the upload and to upload directly
     * the files after the selection without clicking the button.
     *
     *
     *  ### Available Options
     *
     * The following are the options available for the File component:
     *
     * * [id](#id),[selection](#selection), [multiple](#_multiple),
     * [maxFiles](#_maxFiles), [maxSize](#_maxSize),
     * [filters](#_filters),[types](#types),[extensions](#extensions),[allErrorsTogether](#allErrorsTogether),
     * [onAddingFiles](#onAddingFiles),[onWhenAddingFileFailed](#onWhenAddingFileFailed),
     * [selectionInputPlaceHolderText](#selectionInputPlaceHolderText),[applyFiltersOnlyOnPush](#applyFiltersOnlyOnPush)
     * ,[instructionText](#instructionText),[selectionInputPlaceHolderText](#selectionInputPlaceHolderText),
     * [dropZoneAdditionalText](#dropZoneAdditionalText),[uploading](#uploading),[uploaderOptions](#uploaderOptions)
     * ,[_actionButtonText](#actionButtonText),[_actionButtonVisible](#actionButtonVisible)
     * ,[_actionButtonAction](#actionButtonAction),[instructionText](#instructionText)
     * ,[informationTooltipTxt](#informationTooltipTxt),[_selectedItemContextMenu](#selectedItemContextMenu)
     *
     * The following are the methods available for the File component:
     *
     * ### Available Methods
     *
     * * [removeFile](#removeFile),[removeAllFiles](#removeAllFiles), [folderFilter](#folderFilter),
     * [queueLimitFilter](#queueLimitFilter),[removeAllFiles](#removeAllFiles),[removeFile](#removeFile),
     * , [sizeLimitFilter](#sizeLimitFilter), [typeFilter](#typeFilter), [extensionFilter](#extensionFilter),
     * [extensionFilter](#extensionFilter), [upload](#upload), [cancelUpload](#cancelUpload),
     * [cancelAllUpload](#cancelAllUpload), [getReadyItems](#getReadyItems), [autoUpload](#autoUpload),
     * [getTotalUploadProgress](#getTotalUploadProgress)
     *
     *
     * ### Examples
     *
     * #### Example.
     *
     * ```xml
     *    <ers-file id="fileSandbox" selection="ctrl.selection" multiple="ctrl.multiple"
     * max-files="{{ctrl.maxFiles}}" extensions="[ctrl.currentExtension]"
     * max-size="{{ctrl.maxSize}}" types="[ctrl.currentType]"
     * all-errors-together="ctrl.allErrorsTogether" filters="[ctrl.currentFilter]"
     * on-when-adding-file-failed="ctrl.selectFileFailed(errors)"
     * selection-input-place-holder-text="Please, select file(s) to interact with"
     * instruction-text="Select your files here:"
     * drop-zone-additional-text="to interact with" is-upload="ctrl.uploaderOptions"
     * uploader-options="ctrl.uploaderOptions"></ers-file>
     * ```
     *
     */
    class FileComponent extends ers.components.core.BaseController {
        /**
         * the component id.
         *
         *  @type {string}
         *
         * ```xml
         * <ers-file id="monId"/>
         * ```
         */
        id: string;
        /**
         * the current selected Files.
         *
         * @type {IFileItem[]}
         *
         * ```xml
         * <ers-file selection="ctrl.selection"/>
         * ```
         */
        private _selection;
        /**
         * Allow or not the files multiple selection.
         * It blocks multiple selection in the whole component : in the browser file selection window but also in the drop
         * zone or if the user try to select file by file. When it sets to  false, the selected file replace the previous.
         *
         * @type {boolean}
         *
         * ```xml
         * <ers-file multiple="ctrl.multiple"/>
         * ```
         */
        private _multiple;
        /**
         * The maximum files to be selected.
         * Associated with the queueLimit filter.
         * if this limit is exceeded , an error is returned to the onWhenAddingFileFailed function.
         *
         * @type {boolean}
         *
         *  ```xml
         * <ers-file max-files="ctrl.maxFiles"/>
         * ```
         */
        private _maxFiles;
        /**
         * The maximum file size allowed (in bytes).
         * Associated with the sizeLimit filter.
         * if this limit is exceeded , an error is returned to the onWhenAddingFileFailed function.         * @type {boolean}
         *
         *  ```xml
         * <ers-file max-files="ctrl.maxSize"/>
         * ```
         */
        private _maxSize;
        /**
         * The custom filters array : allow to add user custom filters to the existing filters.
         *
         * @type {IFileFilter[]}
         *
         *  ```xml
         * <ers-file filters="ctrl.filters"/>
         * ```
         */
        private _filters;
        /**
         * The allowed file types to be selected.
         * Associated with the typeFilter filter.
         *
         * for example : [null, "image.*", "audio.*", ".*vnd.ms-excel", ".*jpeg", ""]
         *
         * @type {string[]}
         *
         *  ```xml
         * <ers-file types="ctrl.types"/>
         * ```
         */
        private _types;
        /**
         * The allowed file extensions to be selected.
         * Associated with the ExtensionFilter filter.
         *
         * for example : [null, "jpg", "csv", "mp3", "txt", "json"]
         *
         * @type {string[]}
         *
         *  ```xml
         * <ers-file extensions="ctrl.extensions"/>
         * ```
         */
        private _extensions;
        /**
         * Set to true if you want to get all the filter errors, of a same selection, together or set to false if you prefer
         * to be notified one by one. (the errors will be sent to the onWhenAddingFileFailed function)
         *
         * @type {boolean}
         *
         *  ```xml
         * <ers-file all-errors-together="ctrl.allErrorsTogether"/>
         * ```
         */
        allErrorsTogether: boolean;
        /**
         * The callback function to be notified of the filters errors.
         * the function signature must be : functionName(errors:ISelectFileError[])
         *
         * @type {Function}
         *
         *  ```xml
         * <ers-file on-when-adding-file-failed="ctrl.functionName(errors)"/>
         * ```
         */
        onWhenAddingFileFailed: Function;
        /**
         * The callback function to be notified when files are selected.
         * the function signature must be : functionName(files:FileList[])
         *
         * @type {Function}
         *
         *  ```xml
         * <ers-file on-adding-files="ctrl.onAddingFiles(files)"/>
         * ```
         */
        onAddingFiles: Function;
        /**
         * when allErrorsTogether is true, this filters errors array is sent to the callback onWhenAddingFileFailed.
         *
         * @type {ISelectFileError[]}
         */
        private selectFileError;
        /**
         * temporary fileList to select.
         * @type {FileList}
         */
        fileListToSelect: FileList;
        /**
         * files finally selected.
         * @type {FileList}
         */
        private filesSelected;
        /**
         * true if selecting files is in progress.
         */
        private selecting;
        /**
         * true if the filters must be applied only when a new file is added to the selection.
         *
         * @type {boolean}
         *
         *  ```xml
         * <ers-file apply-filters-only-on-push="ctrl.applyFiltersOnlyOnPush"/>
         * ```
         */
        applyFiltersOnlyOnPush: boolean;
        /**
         * place holder text in the selection input.
         * @type {string}
         *
         *  ```xml
         * <ers-file selection-input-place-holder-text="ctrl.selectionInputPlaceHolderText"/>
         * ```
         */
        selectionInputPlaceHolderText: string;
        /**
         *  true if the action button is visible, default:  false
         * @type {boolean}
         *
         *  ```xml
         * <ers-file action-button-visible="ctrl.actionButtonVisible"/>
         * ```
         */
        private _actionButtonVisible;
        /**
         *  The action button text (if visible)
         * @type {string}
         *
         *  ```xml
         * <ers-file action-button-text="ctrl.actionButtonText"/>
         * ```
         */
        private _actionButtonText;
        /**
         *  the callback on the action button
         * @type {Function}
         *
         *  ```xml
         * <ers-file action-button-action="ctrl.actionButtonAction"/>
         * ```
         */
        private _actionButtonAction;
        /**
         * the dropzone additionnal text (the second line)
         * @type {Function}
         *
         *  ```xml
         * <ers-file action-button-action="ctrl.actionButtonAction"/>
         * ```
         **/
        dropZoneAdditionalText: string;
        /**
         *  true if uploading is in progress, default:  false
         * @type {boolean}
         *
         *  ```xml
         * <ers-file uploading="ctrl.uploading"/>
         * ```
         */
        uploading: boolean;
        /**
         *  the upload options.
         * @type {IUploadOptions}
         *
         *  ```xml
         * <ers-file uploader-options="ctrl.uploaderOptions"/>
         * ```
         */
        uploaderOptions: IUploadOptions;
        /**
         * Instruction text (above the selection input)
         * @type {string}
         *
         *  ```xml
         * <ers-file instruction-text="ctrl.instructionText"/>
         * ```
         */
        instructionText: string;
        /**
         * Context menu on each selected files (in the selected items list)
         * @type {IMenuItem[]}
         */
        _selectedItemContextMenu: ers.components.contextmenu.IMenuItem[];
        /**
         * text of the information tooltip (under the select input)
         * @type {string}
         */
        informationTooltipTxt: string;
        /**
         * the $http service.
         * @type {ng.IHttpService}
         */
        private $http;
        /**
         * the $timeout service.
         * @type {ng.ITimeoutService}
         */
        private $timeout;
        /**
         * the promise service.
         * @type {ng.IQService}
         */
        private promiseService;
        /**
         * the $rootscope service.
         * @type {ng.IRootScopeService}
         */
        private $rootscope;
        static $inject: string[];
        /**
         * @constructor
         * @param $scope ng.IScope the scope
         * @param $element ng.IAugmentedJQuery the component element.
         * @param $q ng.IQService the promise service.
         * @param $rootScope ng.IRootScopeService the $rootscope service.
         * @param $http ng.IHttpService the $http service.
         * @param $timeout ng.ITimeoutService the $timeout service.
         */
        constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery, $q: ng.IQService, $rootScope: ng.IRootScopeService, $http: ng.IHttpService, $timeout: ng.ITimeoutService);
        /**
         * Configure the drop zone and the select button.
         */
        private configureUI();
        /**
         * the selection getter
         * @returns {File[]}
         */
        /**
         * the selection setter.
         * @param pSelection
         */
        selection: IFileItem[];
        /**
         *
         * @returns {boolean} true if the action button is visible
         */
        /**
         *
         * @param pVisible {boolean} true if the action button is visible
         */
        actionButtonVisible: boolean;
        /**
         *
         * @returns {string} the action button text.
         */
        /**
         *
         * @param pText {string} the action button text.
         */
        actionButtonText: string;
        /**
         *
         * @returns {Function} the action button action
         */
        /**
         *
         * @param pAction {Function} the action button action
         */
        actionButtonAction: Function;
        /**
         *
         * @returns {string} text displayed during the selection or upload process, beside the clear all button.
         */
        getSelectorUploaderText(): string;
        /************* File Selector Specifics ****************************/
        /**
         * configure the default filters.
         */
        private configureFilters();
        /**
         * The filters getter.
         * @returns {IFileFilter[]} the filters.
         */
        /**
         * The filters setter.
         * @param the filters.
         */
        filters: IFileFilter[];
        /**
         * Default filter : folderFilter
         * @param {Object} item the "file" to check.
         * @returns {Boolean} "true" if item is a file (not folder)
         */
        folderFilter(item: IFileItem): ng.IPromise<Object>;
        /**
         * Default filter : queueLimitFilter
         * this filter is particular : the max files must be verify but the files are not already pushed in the selection
         * because of the promise principle...
         * @param file the file to check.
         * @returns {ng.IPromise<Object>} a promise resolved if the file number limit has not been reached.
         */
        queueLimitFilter(file: IFileItem, currentFileIndex: number): ng.IPromise<Object>;
        /**
         * Default filter : sizeLimitFilter
         * @param file the file to check.
         * @returns {ng.IPromise<Object>} a promise resolved if the size limit has not been reached
         */
        sizeLimitFilter(file: IFileItem): ng.IPromise<Object>;
        /**
         * Default filter : typeFilter
         * @param file the file.
         * @returns {ng.IPromise<Object>} a promise resolved if the file type is allowed.
         */
        typeFilter(file: IFileItem): ng.IPromise<Object>;
        /**
         *
         * @param file the file to check.
         * @returns {ng.IPromise<Object>} a promise resolved if the file extension is allowed.
         */
        extensionFilter(file: IFileItem): ng.IPromise<Object>;
        /**
         * To remove one file from the selection, by its index.
         * @param index the file index.
         * @param pUpdateUploadedStatus true if the uploadStatus.uploaded must be updated.
         */
        removeFile(index: number, pUpdateUploadedStatus: boolean, pKeepInError?: boolean): void;
        /**
         *
         * @param file
         * @param pUpdateUploadedStatus
         * @param pKeepInError
         * @private
         */
        private _removeFile(file, pUpdateUploadedStatus, pKeepInError?);
        /**
         * To remove all the files from the selection.
         */
        removeAllFiles(pKeepInError?: boolean, pUpdateUploadedStatus?: boolean): void;
        /**
         * The maxFiles getter.
         * @returns {number} the maximum.
         */
        /**
         * The maxFiles setter.
         * @param pMaxFiles the maximum.
         */
        maxFiles: number;
        /**
         * The maxSize getter.
         * @returns {number} the maximum.
         */
        /**
         * The maxSize setter.
         * @param pMaxSize the maximum.
         */
        maxSize: number;
        /**
         * Context menu on each selected files (in the selected itmes list)
         * @returns {number} the Context menu .
         */
        /**
         * Context menu on each selected files (in the selected itmes list)
         * @param pMaxFiles the Context menu .
         */
        selectedItemContextMenu: ers.components.contextmenu.IMenuItem[];
        /**
         * The types getter.
         * @returns {string[]} the types.
         */
        /**
         * The types setter.
         * @param pTypes the types.
         */
        types: string[];
        /**
         * The extensions getter.
         * @returns {string[]} the extensions.
         */
        /**
         * The extensions setter.
         * @param pExtensions the extensions.
         */
        extensions: string[];
        /**
         * The multiple getter.
         * @returns {boolean} multiple.
         */
        /**
         * The multiple setter.
         * @param pMultiple multiple
         */
        multiple: boolean;
        /**
         * verify the files validity, and if all it"s OK, the files will be push to the selection array, otherwise errors
         * were be raised.
         * @param files the File list
         */
        pushFiles(files: FileList): ng.IPromise<Object>;
        /**
         * Verify all the selection files with all the filters
         */
        private verifyFiles();
        /**
         * Check if the file pass all the filters. Each filter is a promise which is resolved if the file is not rejected
         * by the filter or rejected in the other case.
         * @param {File} file  the file to check.
         * @param {number} filterIndex the current filter index.
         * @param {number} fileIndex the current filter index.
         * @returns {ng.IPromise<Object>} a promise resolved  if file pass all filters
         */
        private checkFilters(file, filterIndex, fileIndex);
        /**
         * Inner callback to pass all the erros to the user controller.
         * @param {ISelectFileError[]} errors the filters errors
         */
        private _onWhenAddingFileFailed(errors);
        /**
         * Filter error management.
         * If allErrorsTogether is set to true, this method only store this error in the errors array to be sent after the
         * last selected file, otherwise the method call the onWhenAddingFileFailed callback with this error.
         * @param {File} file the file in error.
         * @param {IFileFilter[]} filter the filter that has raised the error.
         */
        private manageError(file, filter);
        /**
         * Errors management when allErrorsTogether=true.
         */
        private manageErrorsBulk();
        /************* END File Selector Specifics ****************************/
        /************* File Uploader Specifics ****************************/
        /**
         * Upload one file or all the selection.
         * the upload could be one by one or togther. It must be sequecial or simultaneous.
         * @param pFileItem a file to upload.
         */
        upload(pFileItem?: IFileItem): void;
        /**
         * Cancel uploading of item from the queue
         * @param {IFileItem} pFile
         */
        cancelUpload(pFile: IFileItem): void;
        /**
         * Cancels uploading of all items from the queue
         */
        cancelAllUpload(): void;
        /**
         * Returns items ready for upload
         * @returns {Array}
         */
        getReadyItems(): IFileItem[];
        /**
         * Returns not uploaded items
         * @returns {Array}
         */
        private getNotUploadedItems();
        /**
         * Returns processed items
         * @returns {Array}
         */
        private getProcessedItems();
        /**
         *
         * @returns {boolean} true if the file must be removed from the queue after its upload.
         */
        private removeAfterUpload();
        /**
         *
         * @returns {boolean} true if the files must be uploaded after selection.
         */
        autoUpload(): boolean;
        /**
         * Initialize the uploadStatus
         * @param pUploading the uploading number
         * @param pUploaded the uploaded number
         * @param pFailed the failed number
         * @param pProgress the progress number
         */
        private initUploadStatus(pUploading?, pUploaded?, pFailed?, pProgress?);
        /**
         * update the uploading number
         * @param pNumber the uploading number.
         */
        private updateUploadingItems(pNumber?);
        /**
         * update the uploaded number
         * @param pNumber the uploaded number.
         */
        private updateUploadedItems(pNumber?);
        /**
         * update the Failed Items number
         * @param pNumber the Failed Items number.
         */
        private updateFailedItems(pNumber?);
        /**
         * Reset the global and item progress.
         * @param pFullReset true if it must be a full reset or only an update of the total progress.
         */
        private resetUploadProgress(pFullReset?);
        /**
         *
         * @param value the current progress.
         * @returns {any} the total progress
         */
        getTotalUploadProgress(value?: number): number;
        /**
         * The XMLHttpRequest transport to upload.
         * @param {IFileItem} item
         */
        private xhrTransport;
        /**
         * Checks whether upload successful
         * @param {number} status the response status
         * @returns {boolean} true if is succeed.
         */
        private isSuccessCode(status);
        /**
         * Transforms the server response
         * @param {string} response the response
         * @param {{}} headers the headers.
         * @returns {string} the transformed response
         */
        private transformResponse(response, headers);
        /**
         * Parsed response headers
         * @param {string} headers the headers.
         * @returns {Object} the parsed headers.
         * @see https://github.com/angular/angular.js/blob/master/src/ng/http.js
         */
        private parseHeaders(headers);
        /**
         * Returns function that returns headers
         * @param {{}} parsedHeaders the headers.
         * @returns {Function} the header getter
         */
        private headersGetter(parsedHeaders);
        /**
         * Inner callback for the item progression
         * @param {IFileItem} item the file item
         * @param {number} progress the upload progress
         */
        private _onUploadProgressItem(item, progress);
        /**
         * Inner callback when the upload succeed
         * @param {IFileItem} item the file item
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         */
        private _onUploadSuccessItem(item, response, status, headers);
        /**
         * Inner callback when the upload failed
         * @param {IFileItem} item the file item
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         */
        private _onUploadErrorItem(item, response, status, headers);
        /**
         * Inner callback when the upload is canceled
         * @param {IFileItem} item the file item
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         */
        private _onUploadCancelItem(item, response, status, headers);
        /**
         * Inner callback when the upload is completed
         * @param {IFileItem} item the file item
         * @param {string} response the response
         * @param {number} status the status response
         * @param {{}} headers the headers
         */
        private _onUploadCompleteItem(file, response, status, headers);
        /**
         * Inner callback when all the upload are completed
         */
        private _onUploadCompleteAllItems();
        /**
         * Updates html
         */
        private render();
    }
}

/**
 * Created by bertheto on 06/18/2015.
 */
/**
 * Created by bertheto on 06/04/2015.
 */
declare module ers.components.file {
    /**
     * ###Image file thumb component
     * Allow to display a thumbnail representation of the image file with height and width specified.   *
     *
     *  ### Available Options
     *
     * The following are the options available for the ersImageFileThumb component:
     *
     * * [file](#_file), [width](#width), [height](#height)
     *
     * The following are the methods available for the ersImageFileThumb component:
     *
     * ### Available Methods
     *
     * * [onLoadFile](#onLoadFile), [onLoadImage](#onLoadImage), [isValid](#isValid),
     * [isFile](#isFile), [isImage](#isImage)
     *
     * ### Examples
     *
     * #### Example.
     *
     * ```xml
     *  <tr ng-repeat="imageFile in ctrl.imageFiles">
     *    <td>
     *      <strong>{{ imageFile.name }}</strong>
     *         <ers-image-file-thumb file="imageFile" height="100" width="100"></ers-image-file-thumb>
     *   </td>
     * </tr>
     * ```
     *
     */
    class ImageFileThumbComponent extends ers.components.core.BaseController {
        /**
         * the Image html element created from the file.
         * @type {HTMLImageElement}
         */
        private img;
        /**
         * the canvas html element used to draw the image as thumb.
         * @type {ng.IAugmentedJQuery}
         */
        private canvas;
        /**
         * the file reader to read the file.
         * @type {FileReader}
         */
        private reader;
        /**
         * The image file
         * @type {File}
         */
        private _file;
        /**
         * the thumb width.
         * @type {number}
         */
        width: number;
        /**
         * the thumb height.
         * @type {number}
         */
        height: number;
        static $inject: string[];
        /**
         * @constructor
         * @param $scope ng.IScope the scope
         * @param $element ng.IAugmentedJQuery the component element.
         */
        constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery);
        /**
         * File getter
         * @returns {File} the file.
         */
        /**
         * File setter
         * @param pFile the file.
         */
        file: File;
        /**
         * the load file event handler : creation of an image with datas read in the file.
         * @param event the event
         */
        private onLoadFile;
        /**
         * the load image event handler : canvas drawing with the image loaded.
         */
        private onLoadImage;
        /**
         *
         * @param item the "file"
         * @returns {boolean} true if the File is valid : really a file and above all an image.
         */
        private isValid(item);
        /**
         *
         * @param item the "file"
         * @returns {boolean} true if the File is really a file.
         */
        private isFile(item);
        /**
         *
         * @param file the "file"
         * @returns {boolean} true if the File is an image.
         */
        private isImage(file);
    }
}


declare module ers.components.form {
    var _formModule: ng.IModule;
}


declare module ers.components.form {
    /**
     * This service will be used to interact with the HTMl form.
     */
    class ErsFormService {
        /**
         * This method will be used to reset all the components referred in the form.
         */
        reset(): void;
        /**
         * This function will be used to show the invalid components in the form via a specific CSS (ers-submitted) placed at
         * the components level.
         * @param formElement The form element on which we will show the component validation.
         * @returns True is the HTML form is valid, false otherwise.
         */
        showValidation(formElement: ng.IAugmentedJQuery): boolean;
    }
}

declare module ers.components.form {
    import BaseComponent = ers.components.core.BaseComponent;
    import ErsFormService = ers.components.form.ErsFormService;
    /**
     *
     * @ngdoc directive
     * @name ersForm
     * @module ers.components.form
     * @tag ers-form
     * @restrict A
     *
     * @description
     *
     * Use the `ersForm` directive on the HTML form instead of the submit attribute or the ng-submit directive.
     * This directive provide useful features as:
     * - validation (not AngularJS) of the component in order to apply the CSS error if invalid.
     * - execute the function given as value of this directive only if the form (and the contained components) is valid.
     *
     * The following example demonstrates a ersForm configured on a HTML form.
     *
     * <div>
     *  <form id="formSample" name="formSample" novalidate ers-form="ctrl.submit()">
     *    <ers-label ng-required="true" value="Textbox component:"></ers-label>
     *    <ers-textbox name="textboxComponent" ng-model="ctrl.textBoxModel" ng-required="true"></ers-textbox>
     *    <br>
     *    <ers-button class="primary" type="submit" form="formSample">Submit</ers-button>
     *  </form>
     *
     * </div>
     *
     *
     * #### Examples
     *
     * The following example displays the code from the description display.
     *
     *
     * ```
     *
     *  <form id="formSample" name="formSample" novalidate ers-form="ctrl.submit()">
     *    <ers-label ng-required="true" value="Textbox component:"></ers-label>
     *    <ers-textbox name="textboxComponent" ng-model="ctrl.textBoxModel" ng-required="true"></ers-textbox>
     *    <br>
     *    <ers-button class="primary" type="submit" form="formSample">Submit</ers-button>
     *  </form>
     *
     * ```
     *
     * @param {Function} ersForm This directive takes as value a the "submit" function which it will be executed if the form is valid.
     *
     */
    class FormController extends BaseComponent {
        /** The form name in which the directive is defined. */
        private formName;
        /** This property will contain the "submit" function to execute if the form and the contained components are valid. */
        private submitFct;
        /** ERS form Service used to manipulate the comopnents contained in the form when the submit/reset event occurred. */
        private _ersFormService;
        static $inject: string[];
        /**
         * Constructor.
         * @param $element The component element.
         * @param $attrs List of the all attribute contained in the XML element of this directive.
         * @param ersFormService ERS form Service used to manipulate the comopnents contained in the form when the submit/reset
         * event occurred.
         */
        constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, ersFormService: ErsFormService);
        /**
         * Function to execute on submit event.
         */
        private ersOnSubmitEventWrapper();
    }
}

declare module ers.components.grid {
    /**
     * Available data types a user can show for the <code>dataType<code> of the grid options
     */
    class DataType {
        /**
         *
         * @type {string}
         */
        static TEXT: string;
        /**
         *
         * @type {string}
         */
        static DATE: string;
        /**
         *
         * @type {string}
         */
        static NUMBER: string;
        /**
         *
         * @type {string}
         */
        static CHECKBOX: string;
        /**
         *
         * @type {string}
         */
        static COMBOBOX: string;
    }
}

declare module ers.components.grid.renderer.options {
    interface IErsCellRendererOptions {
        ngRequired?: boolean;
        ngDisabled?: boolean;
        ngReadonly?: boolean;
    }
}


declare module ers.components.grid.renderer.options {
    /**
     * Expose options of the text box. Please see the textbox documentation for more
     * information.
     */
    interface IErsTextboxRendererOptions extends IErsCellRendererOptions {
        name?: string;
        ngPattern?: string;
        ngMinLength?: number;
        ngMaxlength?: number;
        textAlign?: string;
    }
}


declare module ers.components.grid.renderer.options {
    /**
     * Expose options of the text box. Please see the textbox documentation for more
     * information.
     */
    interface IErsCheckboxRendererOptions extends IErsCellRendererOptions {
        ngTrueValue: string | number | boolean;
        ngFalseValue: string | number | boolean;
    }
}


declare module ers.components.grid.renderer.options {
    /**
     *
     */
    interface IErsComboboxRendererOptions extends IErsCellRendererOptions {
        items: Array<Object | string | number>;
        innerRenderer?: Function;
    }
}


declare module ers.components.grid.renderer.options {
    interface IErsCalendarRendererOptions extends IErsCellRendererOptions {
        minDate: Date;
        maxDate: Date;
        currentText: string;
        closeText: string;
        clearText: string;
        showButtonBar: boolean;
        dateFormat: string;
    }
}

declare module ers.components.grid {
    /**
     * Formalize a column definition used by the grid
     */
    interface IColumnDefinition {
        /**
         * 	The name to render in the column header
         */
        displayName?: string;
        /**
         * Tooltip for the column header
         */
        headerTooltip?: string;
        /**
         * The field of the row to get the cells data from
         */
        field?: string;
        /**
         * Initial width, in pixels, of the cell
         */
        width?: number;
        /**
         * Class to use for the cell. Can be string, array of strings, or function.
         */
        cellClass?: string;
        /**
         * 	An object of css values. Or a function returning an object of css values.
         */
        cellStyle?: string | Function | Object;
        /**
         * A function for rendering a cell.
         */
        cellRenderer?: Function | Object;
        /**
         * Function callback, gets called when a cell is clicked.
         */
        cellClicked?: Function;
        /**
         * Function callback, gets called when a cell is double clicked.
         */
        cellDoubleClicked?: Function;
        /**
         * Comparator function for custom sorting.
         */
        comparator?: Function;
        /**
         * Set to true if no menu should be shown for this column header.
         */
        suppressMenu?: boolean;
        /**
         * Set to true if no sorting should be done for this column.
         */
        suppressSorting?: boolean;
        /**
         * Set to true if you want this columns width to be fixed during 'size to fit' operation.
         */
        suppressSizeToFit?: boolean;
        /**
         * If grouping columns, the group this column belongs to.
         */
        group?: string;
        /**
         * Set to true if this col is editable, otherwise false. Can also be a function to have different rows editable.
         */
        editable?: boolean;
        /**
         * Callbacks for editing. See editing section for further details.
         */
        newValueHandler?: Function;
        /**
         * Callbacks for editing. See editing section for further details.
         */
        cellValueChanged?: Function;
        /**
         * If true, this cell gets refreshed when api.softRefreshView() gets called.
         */
        volatile?: boolean;
        /**
         * Cell template (or specify URL to load template from) to use for cell. Useful for AngularJS cells.
         */
        cellTemplate?: string;
        /**
         * Cell template (or specify URL to load template from) to use for cell. Useful for AngularJS cells.
         */
        cellTemplateUrl?: string;
        /**
         * Set this field to either text|date|number if you enable the edition feature and want the appropriate
         * renderer
         */
        dataType?: string;
        /**
         *
         */
        ersCellRendererOptions?: renderer.options.IErsCellRendererOptions | renderer.options.IErsTextboxRendererOptions | renderer.options.IErsCheckboxRendererOptions | renderer.options.IErsComboboxRendererOptions | renderer.options.IErsCalendarRendererOptions;
    }
}

declare module ers.components.grid {
    /**
     *
     */
    interface IVirtualRowListener {
        /**
         * When a row is clicked, this method is called with the status
         * of the row
         * @param selected : true if the row is in selected state, false otherwise
         */
        rowSelected(selected: boolean): void;
        /**
         *
         */
        rowRemoved(): void;
    }
}

declare module ers.components.grid {
    /**
     * Interface explaining given paramters of IDatasource.getRows
     */
    interface IGetRowsParameters {
        /**
         * The first row index to get.
         */
        start: number;
        /**
         * The first row index to NOT get.
         */
        finish: number;
        /**
         * Callback to call for the result when successful composed of 2 parameters :
         * <ul>
         *   <li>rowsThisPage: An array of rows loaded for this page.</li>
         *   <li>lastRow: The total number of rows, if known.</li>
         * </ul>
         */
        successCallback: Function;
        /**
         *  Callback to call for the result when failed. No paramter expected
         */
        failCallback: Function;
    }
}


declare module ers.components.grid {
    /**
     * A datasource is used when you wish to not load all the rows from the server into the client in one go.
     * There are two ways to do this, pagination and virtual paging. Each of these methods uses a datasource.
     * This section explains creating of a datasource to be used by each of these methods.
     */
    interface IDatasource {
        /**
         * Function you have to implement to get rows
         * @param start The first row index to get.
         * @param finish The first row index to NOT get.
         * @param callbackSuccess Callback to call for the result when successful. expects the following parameters: <ul>
         *   <li>rowsThisPage: An array of rows loaded for this page.</li>
         *   <li>The total number of rows, if known.</li>
         *   </ul>
         * @param callbackFail Callback to call for the result when failed. No parameters expected
         */
        getRows(params: IGetRowsParameters): void;
        /**
         * How large the pages should be. Each call to your datasource will be for one page.
         */
        pageSize: number;
        /**
         * The total number of rows, if known, in the data set on the server. If it's unknown, do not set, or set to -1.
         * This will put the grid into infinite scrolling mode until the last row is reached. The definition of infinite
         * scrolling depends on whether you are doing pagination or virtual paging and is explained in each of those
         * sections.
         */
        rowCount?: number;
        /**
         * Only used in virtual paging. When infinite scrolling is active, this says how many rows beyond the current
         * last row the scrolls should allow to scroll. For example, if 200 rows already loaded from server, and
         * overflowSize is 50, the scroll will allow scrolling to row 250.
         */
        overflowSize?: number;
        /**
         * Only used in virtual paging. How many requests to hit the server with concurrently. If the max is reached,
         * requests are queued. Default is 1, thus by default, only one request will be active at any given time.
         */
        maxConcurrentRequests?: number;
        /**
         * Only used in virtual paging. How many pages to cache in the client. Default is no limit, so every requested
         * page is kept. Use this if you have memory concerns, so pages least recently viewed are purged. If used, make
         * sure you have enough pages in cache to display a complete view of the table, otherwise it won't work and an
         * infinite loop of requesting pages will happen.
         */
        maxPagesInCache?: number;
    }
}


declare module ers.components.grid {
    /**
     * Interface describing the grid api
     */
    interface IGridApi {
        /**
         * Call to inform the grid that the rows have changed. The grid will assume the rows are brand new and draw all
         * rows from scratch.
         */
        onNewRows(): void;
        /**
         * Call to inform the grid that the columns have changed. The grid will redraw all the colum headers, and then
         * redraw all of the rows. The rows will not be discarded, so any selections, scrolling or groups open, will stay.
         */
        onNewCols(): void;
        /**
         * Select all rows (even rows that are not visible due to grouping being and their groups not expanded).
         */
        selectAll(): void;
        /**
         * Clear all row selections.
         */
        deselectAll(): void;
        /**
         *
         * @param node
         * @param multiselect
         */
        selectNode(node: Object, multiselect: boolean): any;
        /**
         *
         * @param node
         */
        deselectNode(node: Object): any;
        /**
         * Select the row at the given index. If multi is true, then previous selections will be kept
         * (ie allow multi-select). If multi is false, any previously selected row will be unselected. If suppressEvents is
         * true, then rowSelected and selectionChanged will not be called during the selection.
         * @param index
         * @param multi
         * @param suppressEvents
         */
        selectIndex(index: number, multi: boolean, suppressEvents: boolean): void;
        /**
         *Returns a list of selected nodes. Getting the underlying node (rather than the data) is useful when working
         * with tree / aggregated data, as the node can be traversed.
         */
        getSelectedNodes(): Object;
        /**
         * Returns true if the node is selected, or false if it is not selected. If the node is a group node, and the group
         * selection is set to 'children', then this will return true if all child (and grand child) nodes are selected,
         * false if all unselected, of undefined if a mixture. This is particularly useful for group selection 'children'
         * as in this mode, the group nodes never appear in the selected rows (as selecting a group implies selecting
         * children).
         * @param node
         */
        isNodeSelected(node: Object): boolean;
        /**
         * Returns a list of all selected nodes at 'best cost' - a feature to be used with groups / trees. If a group has
         * all it's children selected, then the group appears in the result, but not the children. Designed for use with
         * 'children' as the group selection type, where groups don't actually appear in the selection normally.
         */
        getBestCostNodeSelection(): Object;
        /**
         *Rip out and re-insert all visible rows. Handy has a blanket 'redraw all' if changes have been made to the row data.
         */
        refreshView(): void;
        /**
         * Leave the rows intact. Each cell that has been market as volatile (via colDef attribute) will be redrawn.
         * Any cells that are not marked as volatile will be left alone, hence keeping any context or state that they have.
         */
        softRefreshView(): void;
        /**
         * Rip out and re-insert all visible header and footer rows only. Only need to call if update the aggregate data
         * yourself, as this gets called after recomputeAggregates() anyway.
         */
        refreshGroupRows(): void;
        /**
         * Returns the row model inside the table. From here you can see the original rows, rows after filter has been
         * applied, rows after aggregation has been applied, and the final set of 'to be displayed' rows.
         */
        getModel(): Object;
        /**
         * If after getting the model, you expand or collapse a group, call this method to inform the grid. It will work
         * out the final set of 'to be displayed' rows again (ie expand or collapse the group visually).
         */
        onGroupExpandedOrCollapsed(): void;
        /**
         * Expand all groups.
         */
        expandAll(): void;
        /**
         * Collapse all groups.
         */
        collapseAll(): void;
        /**
         * Inform the table that the provided rows have changed. If any of the rows are currently visible (ie due to row
         * virtualisation, these rows have corresponding DOM elements) then only these rows are redrawn. If none of the
         * rows are visible, nothing is done. The table uses object reference comparison (ie row1 === row2) to check the
         * provided rows with the original rows, to find the corresponding rows.
         */
        rowDataChanged(rows: Object): void;
        /**
         * Pass a quick filter text into Angular Grid for filtering. If using Angular, the grid watched the
         * 'quickFilterText' attribute of the gridOptions. If you won't want to use quickFilterText (ie if not using
         * AngularJS) then you can call this method instead to apply a quick filter.
         */
        setQuickFilter(quickFilter: string): void;
        /**
         * Register a callback for notifications about a particular virtualised row. When the row is removed from the table
         * (due to virtualisation), the callback is removed. This callback is intended for cell renderers, that want to
         * register for events for the rendered row - thus if the row is no longer rendered on the screen, the callbacks
         * stop. If the row is redrawn, then the cell renderer must register another callback.
         */
        addVirtualRowListener(rowIndex: number, callback: IVirtualRowListener): void;
        /**
         * Show or hide the loading icon. Pass either true or false. If the method onNewRows is called, the loading icon
         * is automatically hidden.
         */
        showLoading(show: boolean): void;
        /**
         * Recomputes the aggregates in the model and refreshes all the group rows.
         */
        recomputeAggregates(): void;
        /**
         * Ensures the index is visible, scrolling the table if needed.
         */
        ensureIndexVisible(index: number): void;
        /**
         * Ensures a node is visible, scrolling the table if needed. Provide one of a) the node b) the data object c) a
         * comparator function (that taks the node as a paramter, and returns true for match, false for no match)
         */
        ensureNodeVisible(comparator: Function): void;
        /**
         * the grid will act assuming it's a new datasource
         */
        onNewDatasource(): void;
        /**
         * Set the the datasource using the API
         * @param datasource
         */
        setDatasource(datasource: IDatasource): void;
    }
}

declare module ers.components.grid {
    /**
     * Helper interface if you want to use the treeview feature of the grid,
     * each data entry should follow this interface.
     */
    interface ITreeviewData {
        /**
         * Flag the entry as been a leaf or not.
         */
        group: boolean;
        /**
         * Initial state. flag this to true in order to display the entry as expanded
         */
        expanded: boolean;
        /**
         * Data object describing you row.
         */
        data: Object;
        /**
         * Children of the current entry. Each entry is an instance of ITreeviewData
         */
        children: Array<ITreeviewData>;
    }
}

declare module ers.components.grid {
    /**
     * Icons options that can be used in Grid Options
     */
    interface IIconsOptions {
        groupExpanded: string;
        groupContracted: string;
    }
}


declare module ers.components.grid {
    /**
     * Interface describing available option for the grid option
     */
    interface IGridOptions {
        /**
         * Will let you acces to the Grid API after the grid initialization.
         */
        api?: IGridApi;
        /**
         * Add a row with a checkbox which let the user select a line. You must enable
         * row selection to have this work
         */
        checkboxSelection?: boolean;
        /**
         * Array of column definition. Use this field to give to the grid headers of your
         * grid.
         */
        columnDefs: Array<IColumnDefinition>;
        /**
         * Whether to group the headers. Default is false.
         */
        groupHeaders?: boolean;
        /**
         * Height, in pixels, of the header row. If not grouping headers, default is 25.
         * If grouping headers, default is 50.
         */
        headerHeight?: number;
        /**
         * Data to be displayed as rows in the table
         */
        rowData: Array<Object> | Array<ITreeviewData>;
        /**
         * Type of row selection, set to either 'single' or 'multiple' to enable selection.
         * Take a look on RowSelectionType class for a helper
         */
        rowSelection?: string;
        /**
         * Set to true or false (default is false). If true, then rows will be deselected if you
         * hold down ctrl + click the row.
         */
        rowDeselection?: boolean;
        /**
         * Number of columns to pin. Default is 0.
         */
        pinnedColumnCount?: number;
        /**
         * Height of rows, in pixels. Default is 25 pixels.
         */
        rowHeight?: number;
        /**
         * Set to true or false (default is false)
         */
        enableColResize?: boolean;
        /**
         * Set to true or false (default is false)
         */
        enableSorting?: boolean;
        /**
         * Set to true or false (default is false)
         */
        enableFilter?: boolean;
        /**
         * Rows are filtered using this text as a 'quick filter'
         */
        quickFilterText?: string;
        /**
         * 	Class to use for the row. Can be string, array of strings, or function.
         */
        rowClass?: string | string[] | Function;
        /**
         * An object of CSS values. Or a function returning an object of css values.
         */
        rowStyle?: Object | Function;
        /**
         * Whether to compile the rows for Angular. Default is false (for performance).
         * Turn on if you want to use AngularJS in your custom cell renderers.
         */
        angularCompileRows?: boolean;
        /**
         * Whether to compile provided custom filters. Default is false (for performance).
         * Turn on if you want to use AngularJS in your custom filters.
         */
        angularCompileFilters?: boolean;
        /**
         * Whether to compile the customer headers for AngularJS. Default is false (for performance).
         * Turn on if you want to user AngularJS in your custom column headers.
         */
        angularCompileHeaders?: boolean;
        /**
         * Provide a function for custom header rendering.
         */
        headerCellRenderer?: Function;
        /**
         * An array of 1 or more strings, each entry an item to group by. Leave blank,
         * or empty array, for no grouping.
         */
        groupKeys?: string[];
        /**
         * If grouping, set to true or false (default is false). If true,
         * group row will use all columns spanning the entire width of the
         * table. If false, only the first column will be used to display the group,
         * and the remaining columns will render as normal. If no aggregation
         * function (groupAggFunction) is defined, then the additional cells in
         * the group row will be blank. If an aggregation function is defined,
         * then the result of the aggregation will be used for values in the remaining
         * cells.
         */
        groupUseEntireRow?: boolean;
        /**
         * If grouping, allows custom rendering of the group cell. Use this if you are not happy with the
         * default presentation of the group. This is only used when groupUseEntireRow=true.
         */
        groupInnerCellRenderer?: Function;
        /**
         * If grouping, set to true, false or a number (default is false). If true, when data is loaded,
         * groups will be expanded by default. If false, they won't. If a number, then the first n
         * levels will be expanded, eg 0 for none, 1 first level only, etc.
         */
        groupDefaultExpanded?: boolean | number;
        /**
         * If grouping, used to create aggregates. The aggregation function takes an array of rows and
         * should return one row that's an aggregate of the passed rows. For example, if each row has
         * a field called 'price', and you want the total price, then return an object with the total
         * price in a field 'price'. This will then get rendered in the price column on in the group row.
         */
        groupAggFunction?: Function;
        /**
         * If grouping, whether to show a group footer when the group is expanded. If true, then by default,
         * the footer will container aggregate data (if any) when shown and the header will be black.
         * When closed, the header will contain the aggregate data regardless of this setting (as footer
         * is hidden anyway).
         */
        groupIncludeFooter?: boolean;
        /**
         * TODO
         */
        groupSelectsChildren?: Object;
        /**
         * Parameters for grouping. See the section on grouping for details explanation.
         * TODO
         */
        groupSuppressGroupColumn?: Object;
        /**
         * Set to true or false (default is false). When true, scrollbars are not used.
         */
        dontUseScrolls?: boolean;
        /**
         * Function callback, gets called when a row is selected.
         */
        rowSelected?: Function;
        /**
         * Function callback, gets called when a row is clicked.
         */
        rowClicked?: Function;
        /**
         * Function callback, gets called when a cell is clicked.
         */
        cellClicked?: Function;
        /**
         * Function callback, gets called when a cell is double clicked.
         */
        cellDoubleClicked?: Function;
        /**
         * Function callback, gets called when displayed rows have changed. Happens following sort,
         * filter or tree expand / collapse events.
         */
        modelUpdated?: Function;
        /**
         * Function callback, gets called after Angular Grid has initialised.
         * The name 'ready' was influenced by the authors time programming the
         * Commodore 64. Use this function if, for example, you need to use the
         * grid's API to fix the columns to size.
         */
        ready?: Function;
        /**
         * If true, rows won't be selected when clicked. Use when you want checkbox selection exclusively.
         */
        suppressRowClickSelection?: boolean;
        /**
         * Function callback, gets called when a selection is changed.
         */
        selectionChanged?: Function;
        /**
         * Function callback, gets called when a value has changed after editing.
         */
        cellValueChanged?: Function;
        /**
         * Function callback, to allow adding a css class to a row.
         */
        getRowClass?: Function;
        /**
         * The default width for each col. Widths specified in column definitions get preference over this.
         */
        colWidth?: number;
        /**
         * Set to true if data provided to the grid is already in node structure (this is for passing
         * already aggregated data to the grid).
         */
        rowsAlreadyGrouped?: boolean;
        /**
         * Defaults to 5. Set higher to increase the number of rows that automatically load before
         * and after the viewport.
         */
        rowsBuffer?: number;
        /**
         * A datasource is used when you wish to not load all the rows from the server into the client in one go.
         * There are two ways to do this, pagination and virtual paging. Each of these methods uses a datasource.
         * This section explains creating of a datasource to be used by each of these methods.
         */
        datasource?: IDatasource;
        /**
         * As a developper, you can customized displayed icons using this options
         */
        icons?: IIconsOptions;
        /**
         * Set this option to true if you want to edit data of the column
         */
        editable?: boolean;
    }
}

declare module ers.components.grid {
    /**
     * Define expected attributes for the <code>ers-grid</code
     * component
     */
    interface IGridScope extends ng.IScope {
        options: IGridOptions;
    }
}


declare module ers.components.grid {
    /**
     * Parameter details given to a cell renderer function
     */
    interface ICellRendererParams {
        /**
         * The value to be rendered.
         */
        value: string | number | boolean | Object;
        /**
         * The row (from the rowData array, where value was taken) been rendered. It contains
         * all the fields you provided in the data row
         */
        data: Object;
        /**
         *The colDef been rendered.
         */
        colDef: IColumnDefinition;
        /**
         *If compiling to Angular, is the row's child scope, otherwise null.
         */
        $scope: ng.IScope;
        /**
         *The index of the row renderer, after sorting and filtering.
         */
        rowIndex: number;
        /**
         *A reference to the Angular Grid api.
         */
        api: IGridApi;
        /**
         *The context as set on the gridOptions.
         */
        context: Object;
        /**
         *A callback function, to tell the grid to refresh this cell and reapply all css styles and classes.
         */
        refreshCell: Function;
        /**
         *
         */
        node: Object;
    }
}


declare module ers.components.grid.renderer {
    interface IRenderer {
        /**
         * Function meant to be called by the Grid. It can return an HTMLElement or a string
         * @param parameters
         */
        renderer(parameters: ICellRendererParams): HTMLElement | string;
    }
}

declare module ers.components.grid.renderer {
    /**
     * This helper is only for the column of selection checkbox we add at the
     * beginning of the grid
     */
    class CheckboxSelectionRenderer implements IRenderer {
        /**
         *
         * @param parameters
         */
        renderer(cellRendererParams: ICellRendererParams): HTMLElement;
    }
}

declare module ers.components.grid {
    /**
     * Helper class in order to specifiy row selection mode (named rowSelection)
     * in your grid options
     *
     */
    class RowSelectionMode {
        /**
         * This selection mode will let you select multiple line
         * @type {string}
         */
        static MULTIPLE: string;
        /**
         * This selection mode let you select only one line at time. If a line
         * is already selected and you select another one, the last selection
         * will be lost
         * @type {string}
         */
        static SINGLE: string;
    }
}


declare module ers.components.grid.renderer {
    /**
     * The default cell render for a tree grid used or the first column
     */
    class TreeviewCellRender implements IRenderer {
        /**
         *
         * @param parameters
         */
        renderer(cellRendererParams: ICellRendererParams): string;
    }
}

declare module ers.components.grid.utils {
    class StringUtils {
        /**
         * Take a string formatted as a camelCase and transform it
         * to words separated by a dash and all in lower case (eg : ngRequired will give ng-required)
         * src : http://www.devcurry.com/2011/07/javascript-convert-camelcase-to-dashes.html
         * @param str
         * @returns {any}
         */
        static camelToDash(str: string): string;
    }
}


declare module ers.components.grid.renderer {
    /**
     * A common renderer for editing data in the grid. You should not use this. You should extend
     * this one a customize the expreience following your needs.
     */
    class CommonErsInputRenderer implements IRenderer {
        protected $scope: ng.IScope;
        protected $compile: ng.ICompileService;
        protected $filterService: ng.IFilterService;
        /**
         *
         * @param $scope
         * @param $compile
         * @param $filterService
         */
        constructor($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService);
        /**
         * Default method to give to the grid (cellRenderer field of the column definition).
         * This method will return the content depending on the mode. If the desired mode is
         * edition (formalzed by the editing field of the column definition), this render
         * will return an HTMLElement object containing the editor. Otherwise, the reader
         * is returned.
         * @param params
         * @returns {HTMLElement}
         */
        renderer(params: ICellRendererParams): HTMLElement;
        /**
         * Just to be able to distinguish this text portion from a component and easily a
         * CSS style only to this text otherwise my option was to apply a style to the upper
         * span but then, the component had herited the CSS properties which i didn't wanted.
         * @param value
         * @returns {HTMLElement}
         */
        protected getReadingView(params: ICellRendererParams): HTMLElement;
        /**
         * The grid default's overflow value of cells is hidden. It must be hidden when we
         * are in reading mode otherwise we can have visual glitch. Be sure to call
         * this method when you a in reading mode.
         * @param params
         */
        protected restoreCellOverflow(params: ICellRendererParams): void;
        /**
         * Return the user's cell render wrapped into an HTMLElement if it's a string.
         *
         * @param params
         * @returns {HTMLElement}
         */
        protected getUserCellRender(params: ICellRendererParams): HTMLElement;
        /**
         * It will check provided options (listed in IErsCellRendererOptions) and
         * for each options, if needed, add it to the provided HTML element
         * @param options
         * @returns {string}
         */
        protected getOptionsAsString(options: options.IErsCellRendererOptions): string;
        /**
         * Return the editor
         * @param params
         * @returns {HTMLElement}
         */
        protected getEditingView(params: ICellRendererParams): HTMLElement;
        /**
         *
         * @param compiledTemplate
         * @param params
         * @param scope
         */
        protected bindEvent(compiledTemplate: ng.IAugmentedJQuery, params: ICellRendererParams, scope: ng.IScope): void;
        /**
         * This method will just update the 'editing' field of the column definition and switch
         * it the true and launch a cell refresh
         * @param params
         * @param cell
         * @param event
         */
        onDoubleClick(params: ICellRendererParams, cell: HTMLElement, event: MouseEvent): void;
        /**
         * Called when we leave the editor. Check if we are in edit mode and update the editing
         * field value if it's the case.
         * Finally, it will launch a cell refresh to update it.
         * @param params
         * @param scope
         * @param targetedCell
         */
        onBlur(event: Event, params: ICellRendererParams, scope: ng.IScope): void;
        /**
         * Try to intercept ENTER and ESCAPE in order to validate data in editing mode
         * of discard it
         * @param keyboardEvent
         * @param params
         * @param scope
         */
        onKeydown(keyboardEvent: KeyboardEvent, params: ICellRendererParams, scope: ng.IScope): void;
    }
}

declare module ers.components.grid.renderer {
    class ErsTextboxRenderer extends CommonErsInputRenderer implements IRenderer {
        /**
         * In order to prevent to have one ErsTextboxRenderer instance per cell,
         * we will work only with one singleton
         */
        private static _instance;
        /**
         *
         * @param $scope
         * @param $compile
         * @param $filterService
         */
        constructor($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService);
        /**
         *
         * @param $scope
         * @param $compile
         * @param $filterService
         * @returns {ErsTextboxRenderer}
         */
        static getInstance($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService): ErsTextboxRenderer;
        /**
         * Return the editor (an Ers Textbox component)
         * @param params
         * @returns {HTMLElement}
         */
        protected getEditingView(params: ICellRendererParams): HTMLElement;
        /**
         * Bind the event (keydown and blur) to the component in order to let the user leave the
         * editor
         * @param compiledTemplate
         * @param params
         * @param ersTextboxScope
         */
        protected bindEvent(compiledTemplate: ng.IAugmentedJQuery, params: ICellRendererParams, ersTextboxScope: ng.IScope): void;
        /**
         *
         * @param options
         * @returns {string}
         */
        protected getOptionsAsString(options: options.IErsTextboxRendererOptions): string;
    }
}


declare module ers.components.grid.renderer.options {
    /**
     * Expose options of the number box. Please see the textbox documentation for more
     * information.
     */
    interface IErsNumberRendererOptions extends IErsCellRendererOptions {
        name?: string;
        min?: number;
        max?: number;
        textAlign?: string;
        format?: string;
    }
}


declare module ers.components.grid.renderer {
    class ErsNumberRenderer extends CommonErsInputRenderer implements IRenderer {
        /**
         * Store the singleton
         */
        private static _instance;
        constructor($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService);
        /**
         * Let the developer retrieve the current instance of the singleton
         * @param $scope
         * @param $compile
         * @param $filterService
         * @returns {ErsNumberRenderer}
         */
        static getInstance($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService): ErsNumberRenderer;
        /**
         * return the reader part of the renderer. We also apply the given filter (if any)
         * to the data before rendering
         *
         * @param params
         * @returns {HTMLElement}
         */
        protected getReadingView(params: ICellRendererParams): HTMLElement;
        /**
         * Return the HTMLElement having the Numberbox editor
         * @param params
         * @returns {HTMLElement}
         */
        protected getEditingView(params: ICellRendererParams): HTMLElement;
        /**
         * Bind keyboard and blur events to the right elements.
         * @param compiledTemplate
         * @param params
         * @param ersNumberScope
         */
        protected bindEvent(compiledTemplate: ng.IAugmentedJQuery, params: ICellRendererParams, ersNumberScope: ng.IScope): void;
        /**
         * Override the parent behavior. Ers Number already implements a handler for escape
         * @param keyboardEvent
         * @param params
         * @param scope
         * @param cell
         */
        onKeydown(keyboardEvent: KeyboardEvent, params: ICellRendererParams, scope: ng.IScope): void;
        /**
         * Check the options of the renderer (see IErsNumberRendererOptions) and add it to
         * the template
         * @param options
         * @returns {string}
         */
        protected getOptionsAsString(options: options.IErsNumberRendererOptions): string;
    }
}

/**
 * Created by GunduzB on 7/3/2015.
 */
declare module ers.components.grid.renderer {
    /**
     * As you will notice in the code, i didn't use the real ers-checkbox component since it's a full
     * angularjs component and in this use case, a full angularjs checkbox has a heavy impact on
     * performance.
     */
    class ErsCheckboxRenderer implements IRenderer {
        private static _instance;
        protected $scope: ng.IScope;
        protected $compile: ng.ICompileService;
        constructor($scope: ng.IScope, $compile: ng.ICompileService);
        /**
         * Let you retrieve he singleton
         * @param $scope
         * @param $compile
         * @returns {ErsCheckboxRenderer}
         */
        static getInstance($scope: ng.IScope, $compile: ng.ICompileService): ErsCheckboxRenderer;
        renderer(cellRendererParams: ICellRendererParams): HTMLElement;
    }
}


declare module ers.components.grid.renderer {
    class ErsComboboxRenderer extends CommonErsInputRenderer implements IRenderer {
        private static _instance;
        constructor($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService);
        /**
         * Let you retrieve the singleton
         * @param $scope
         * @param $compile
         * @param $filterService
         * @returns {ErsComboboxRenderer}
         */
        static getInstance($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService): ErsComboboxRenderer;
        /**
         * Return the HTMLElement having the editor
         * @param params
         * @returns {HTMLElement}
         */
        protected getEditingView(params: ICellRendererParams): HTMLElement;
        /**
         * Just aggregate the HTML with options, bind a scope and give it to angular to compile it
         * @param params
         * @param ersComboboxScope
         * @returns {ng.IAugmentedJQuery}
         */
        private getCompiledTemplate(params, ersComboboxScope);
        /**
         * Internal method which will create the HTML entries corresponding to desired items
         * @param params
         * @param ersComboboxScope
         * @returns {string}
         */
        private getItemsTemplate(params, ersComboboxScope);
        /**
         * Bind desired keyboard events and 'on change' event to the corresponding behavior.
         * See onBlur and onKeydown method of the CommonersInputRenderer for more information about
         * those events
         * @param compiledTemplate
         * @param params
         * @param ersComboboxScope
         */
        private bindEvents(compiledTemplate, params, ersComboboxScope);
        onDoubleClick(params: ICellRendererParams, cell: HTMLElement, event: MouseEvent): void;
    }
}

declare module ers.components.grid.renderer {
    class ErsCalendarRenderer extends CommonErsInputRenderer implements IRenderer {
        /**
         * In order to have better performance, we use a single instance for all cells. This is
         * the singleton.
         */
        private static _instance;
        /**
         *
         * @param $scope
         * @param $compile
         * @param $filterService
         */
        constructor($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService);
        /**
         * return the singleton
         * @param $scope
         * @param $compile
         * @param $filterService
         * @returns {ErsCalendarRenderer}
         */
        static getInstance($scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService): ErsCalendarRenderer;
        /**
         * The calendar has a formatter and can be configured by the user using the dedicated
         * option. (see Calendar component IErsCalendarRendererOptions for more information
         * about available options)
         * @param params
         */
        protected getReadingView(params: ICellRendererParams): HTMLElement;
        /**
         * Return the HTMLElement having the editor (calendar component)
         * @param params provided by the grid
         * @returns {HTMLElement}
         */
        protected getEditingView(params: ICellRendererParams): HTMLElement;
        /**
         * Return the calendar component template compiled by angular. We attach a scope having
         * needed parameters before requesting the angular compile.
         * @param params
         * @param ersCalendarScope
         * @returns {ng.IAugmentedJQuery}
         */
        private getCompiledTemplate(params, ersCalendarScope);
    }
}


/**
 * @ngdoc directive
 * @module ers.components.grid
 * @name ersGrid
 * @restrict E
 *
 * @description
 *
 * Use the `ers-grid` component to create and display a grid. The grid relies on a specific JSON object
 * containing options like column definitions and data. The data can be provided after
 * the grid initialization.
 *
 * ####Visual Design Guidelines
 * There are no specific visual design guidelines for `ers-grid`.
 *
 * ### Example
 *
 * ```xml
 * <ers-grid options="myOpts"></ers-grid>
 * ```
 *
 * @params {Object} options
 *
 */
declare module ers.components.grid {
    /**
     * Angular module having all necessary resources for the grid component
     * @type {IModule}
     */
    var gridModule: ng.IModule;
    /**
     * The Controller for our Grid
     */
    class GridComponent {
        /**
         * Needed resources for the component wired using angular
         * @type {string[]}
         */
        static $inject: string[];
        /**
         *
         * @type {string[]}
         */
        private static MESSAGES;
        /**
         * Icon definition for tree view mode when a leaf is expanded
         * @type {string}
         */
        static GROUP_EXPANDED_ICON: string;
        /**
         * Icon definition for tree view mode when a leaf is contracted
         * @type {string}
         */
        static GROUP_CONTRACTED_ICON: string;
        /**
         * Logger provided by angular injection
         */
        private logger;
        /**
         * The attributes param provided by angular
         */
        private attributes;
        /**
         * Element accessor. Will only be used to add our ers-grid css to the component.
         */
        private element;
        /**
         *
         */
        private $scope;
        /**
         *
         */
        private $compile;
        /**
         *
         */
        private $filterService;
        /**
         * Options for the ers-grid component
         */
        options: IGridOptions;
        /**
         * This flag will be set to true when the grid is ready. If options are
         * not provided, this flag will stay to false;
         * @type {boolean}
         */
        initialized: boolean;
        /**
         * This variable store the message to display to the user when the grid
         * is loading or an issue accure with the grid
         * @type {string}
         */
        loadingMessage: string;
        constructor(logger: ng.ILogService, element: ng.IAugmentedJQuery, attributes: ng.IAttributes, $scope: ng.IScope, $compile: ng.ICompileService, $filterService: ng.IFilterService);
        /**
         * Initilizaer of the component. It will customize the grid before rendering
         */
        init(): void;
        /**
         * This method will customize the header style. For now, it's only customizing the height
         * of the header if nothing is provided
         */
        private customizeHeaderStyle();
        /**
         * This intend to customize row options. For now, it will only customize
         * the height and set it to 35 px
         */
        private customizeRows();
        /**
         * This method check if the user want a treeview. If it's the case, it will
         * check if the user setted icons for tree nodes and set the defaults ones
         * if the user didn't specified anything
         */
        private customizeForTreeView();
        /**
         * Check if the checkbox for line selection is needed. If it's the case, adding a column
         * having the checkbox
         */
        private checkCheckboxSelection();
        /**
         * Will check each column and set the approriate renderer if no renderer is found
         */
        private checkEditableRenderer();
        /**
         * Given the column definition, will determine if a cell renderer is needed and set it.
         * @param columnDef
         */
        private resolveCellRenderer(columnDef);
        /**
         * Symptom : when the user double click somewhere else than the containt of the component
         * (between the component and the grid's cell edge), the component is not setted to
         * edition mode. So, we catch the event and give it to the underlying ers component
         * @param columnDef
         */
        private patchDoubleClick(columnDef);
        /**
         * Checking if a column need a custom CSS for a given renderer
         * @param columnDef
         * @param params
         */
        private checkCssStyleForColumn(columnDef);
    }
}

/**
 * @author kinmaj
 * @description ERS icon Directive : ers-icon.
 * Icon component. This is a standardised set of icons to be used across the ers product suite.
 */
declare module ers.components.icon {
    /**
     * @ngdoc directive
     * @module ers.components.icon
     * @name ersIcon
     * @restrict E
     *
     * @description
     *
     * Use the `ers-icon` component to display a variety of Galileo icons.
     *
     * <style>
     *   .icon-preview ers-icon {
   *      margin: 10px;
   *   }
     *   .icon-preview ers-icon i.fa {
   *      font-size: 20px;
   *   }
     * </style>
     *
     * <div class="icon-preview" style="margin: 30px;">
     *   <ers-icon name="move" ers-tooltip tt-title="Move something..."></ers-icon>
     *   <ers-icon name="refresh" ers-tooltip tt-title="Refresh soemthing else..."></ers-icon>
     *   <ers-icon name="processing" ng-disabled="true" ers-tooltip tt-title="Still loading..."></ers-icon>
     * </div>
     *
     * #### Visual Design
     *
     * Use icons anywhere a user can take an action, or to make specific data or information stand out
     * from the surrounding data.
     *
     * #### Example
     *
     * Consider the following examples of the different ways to implement icons.
     *
     * ##### Basic Icon Example
     *
     * This example sets the basic icon type:
     *
     * ```xml
     * <ers-icon name="{{ iconType }}"
     *           ng-disabled="false"></ers-icon>
     * ```
     *
     * The following example provides the code used for the description:
     *
     * ```xml
     * <div>
     *   <ers-icon name="move"></ers-icon>
     *   <ers-icon name="refresh"></ers-icon>
     *   <ers-icon name="processing" ng-disabled="true"></ers-icon>
     * </div>
     *```
     *
     * @param {string} name Defines the name of icon being displayed.
     *
     * @param {boolean} [ng-disabled=false]  Sets the current icon to disabled or not.
     *
     * @param value {string} Returns the name of the current icon from the available icons.
     *
     *
     *
     */
    class IconComponent extends ers.components.core.BaseComponent {
        /** Icon name. */
        private _name;
        /** Hook used to apply specifics behaviours on the click event. */
        private spanHook;
        /**true if the icon is clickable. */
        private isClickable;
        /**Font size in px for the icon. */
        private _size;
        private static ICONS;
        static $inject: string[];
        /**
         * Constructor.
         *
         * @param $element The component element.
         * @param $attrs The attributes specify in the directive.
         */
        constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes);
        /**
         * Configure the click listener on the current icon. When the icon is disabled, the click event is stopped.
         */
        configureClickListener(): void;
        /**
         * Get the current icon name.
         * @returns {string} Returns the current icon name if it is among the available icons, undefined otherwise.
         */
        /**
         * Set the current icon name.
         * @param value {string} The name of the current icon among the available icons.
         */
        name: string;
        /**
         * Get the current icon name.
         * @returns {string} Returns the current icon name if it is among the available icons, undefined otherwise.
         */
        /**
         * Set the current icon name.
         * @param value {string} The name of the current icon among the available icons.
         */
        size: number;
    }
}


/**
 * @ngdoc directive
 * @module ers.components.label
 * @name ersLabel
 * @restrict E
 *
 *
 *
 *
 * @description
 *
 * Use the `ers-label` component to create custom text labels for use inside of forms, or anywhere that long text
 * should be hidden instead of wrapping, or to denote that something is required. The following example is a label that
 * is required, and is too long to fit the area. Note that when the text is cut off and ellipses replace the end of the
 * text. Hovering over the text displays a browser tooltip containing the missing text.
 *
 *
 * <style type="text/css">
 *  .labelStyles {
 *   position: relative;
 *   display: inline-block;
 *   width: 130px;
 * }
 *
 * .fieldStyles {
 *   position: relative;
 *   display: inline-block;
 *   width: 200px;
 *    margin-bottom: 10px;
 * }
 * </style>
 *
 * <div>
 * <div class="labelStyles">
 * <ers-label value="Long labels are cut off" ng-required="true">
 *     </ers-label>
 * </div>
 * <div class="fieldStyles">
 * <ers-textbox name="leftAlign" ng-model="leftAlign"
 * text-align="left"
 * ng-readonly="false"
 * ng-disabled="false"></ers-textbox>
 * </div>
 * </div>
 *
 *
 *
 * The label component provides the following:
 *
 * - Ellipses to indicate a long text string.
 * - Browser tool tips to display the entire label text when you mouse over.
 * - A red asterisk to indicate required fields.
 *
 * #### Visual Design Guidelines
 *
 * Use labels form elements to explain to the user what values are expected when filling
 * out the form. The explanations should be a very short (1-3 word) descriptions of the input.
 *
 * You can apply standard html and .css formatting and styles to the label.
 *
 *
 * #### Example
 *
 * The description example is based on the following code:
 *
 * ```xml
 * <ers-label value="Long labels are cut off" ng-required="true">
 *      </ers-label>
 *
 *         <ers-textbox name="leftAlign" ng-model="leftAlign"
 *         text-align="left"
 *         ng-readonly="false"
 *         ng-disabled="false">
 *         </ers-textbox>
 *
 * ```
 *
 *
 *
 *
 * @param {string} value
 *
 * Defines the label text.
 *
 * ```xml
 *
 * <ers-label value="Hello World!"></ers-label>
 *
 * ```
 *
 * @param {boolean} [ng-required=false]
 * Marks the input as required. This adds the red asterisk(*) to the combo box list item.
 *
 * ```xml
 *
 * <ers-label ng-required="true" value="Birth Date:"></ers-label>
 *
 * ```
 *
 *
 *
 */
declare module ers.components.label {
    /**
     * Label Controller.
     */
    class LabelComponent extends ers.components.core.BaseComponent {
        /** The label value. */
        value: string;
        /**
         * (Optional)
         * Used to specify that the label must be flagged 'required' (true), or not (false).
         * Expected values: true/false.
         * Default value: false.
         */
        required: boolean;
        static $inject: string[];
        /**
         * Constructor.
         *
         * @param $element The component element.
         */
        constructor($element?: ng.IAugmentedJQuery);
    }
}



/**
 * Created by germonneauf on 30/06/2015.
 */
declare module ers.components.layout {
    class Position {
        private _x;
        private _y;
        constructor();
        x: number;
        y: number;
    }
    var layoutUtils: {
        getRawStyle: (element: HTMLElement, property: string) => string;
        isPercentBasis: (element: HTMLElement, property: string) => boolean;
        cssPixel2Number: (element: HTMLElement, property: string) => number;
    };
}


/**
 * Created by germonneauf on 01/06/2015.
 */
declare module ers.components.layout {
    /**
     * Splitter Scope interface.
     */
    interface ISplitterScope extends ng.IScope {
        direction: string;
        collapsible: string;
        useProxy: boolean;
    }
}


/**
 * Created by germonneauf on 17/06/2015.
 */
declare module ers.components.layout {
    /**
     * Constants static class. Store all shared constants for the module.
     * @class
     */
    class Constants {
        static DIRECTION_HORIZONTAL: string;
        static DIRECTION_VERTICAL: string;
        static COLLAPSIBLE_FIXED_WIDTH: number;
        static SPLITTER_SIZE: number;
        static ON_COLLAPSE_LEFT: string;
        static ON_COLLAPSE_RIGHT: string;
        static ON_COLLAPSE_TOP: string;
        static ON_COLLAPSE_BOTTOM: string;
        static ON_COLLAPSE_BOTH: string;
        static ON_COLLAPSE_REACH_MIN: string;
    }
}


/**
 * Created by germonneauf on 01/06/2015.
 */
declare module ers.components.layout {
    interface IResizableController {
        isResizable: () => boolean;
        useProxy: () => boolean;
        proxy: string;
    }
    interface ICollapsibleController {
        isCollapsible: () => boolean;
        collapsible: string;
    }
    interface IConfigurable {
        configureElements: ($timeout: ng.ITimeoutService) => void;
    }
    interface IDraggableDelegate {
        doMouseDown: (event: JQueryEventObject) => void;
        doMouseUp: (event: JQueryEventObject) => void;
        doMouseMove: (event: JQueryEventObject) => void;
    }
    interface ISplitter extends IDraggableDelegate {
        prev: ng.IAugmentedJQuery;
        next: ng.IAugmentedJQuery;
        refreshMousePos: (event: JQueryEventObject) => void;
        checkFlexBox: (element: ng.IAugmentedJQuery) => void;
        onMouseDown: (event: JQueryEventObject) => void;
        onMouseUp: (event: JQueryEventObject) => void;
        onMouseMove: (event: JQueryEventObject) => void;
        setProxyPosition: (proxyElement: ng.IAugmentedJQuery, value: number) => void;
        initProxyPosition: (proxyElement: ng.IAugmentedJQuery) => void;
        getProxyStyle: () => string;
    }
    interface ICollapsable extends ISplitter {
        id: string;
        setExpandedSizes: () => void;
        collapsedPx: () => number;
        expandedPx: () => number;
        doExpand: (event: JQueryEventObject, needResize?: boolean) => void;
        doCollapse: (event: JQueryEventObject, needResize?: boolean) => void;
    }
    interface IHelper {
    }
}

/**
 * Created by germonneauf on 02/07/2015.
 */
declare module ers.components.layout {
    class SplitterProxy implements IDraggableDelegate {
        private _splitter;
        private _element;
        private _quantity;
        constructor(splitter: SplitterDelegate);
        doMouseDown(event: JQueryEventObject): void;
        doMouseUp(event: JQueryEventObject): void;
        doMouseMove(event: JQueryEventObject): void;
        protected reset(): void;
        splitter: SplitterDelegate;
        element: ng.IAugmentedJQuery;
        quantity: number;
    }
}

/**
 * Created by germonneauf on 06/05/2015.
 */
declare module ers.components.layout {
    class SplitterDelegate extends ers.components.core.BaseComponent implements ISplitter {
        private static FLEX_FIXED_STYLE;
        protected static CSS_FILTER: string;
        private _mousePos;
        private _draggableElement;
        private _id;
        protected _minPrev: number;
        protected _minNext: number;
        protected _helper: IHelper;
        protected _useProxy: boolean;
        protected _proxy: IDraggableDelegate;
        constructor(element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService, proxy?: boolean);
        configureElements($timeout: ng.ITimeoutService): void;
        onMouseDown(event: JQueryEventObject): void;
        onMouseUp(event: JQueryEventObject): void;
        onMouseMove(event: JQueryEventObject): void;
        doMouseDown(event: JQueryEventObject): void;
        doMouseUp(event: JQueryEventObject): void;
        doMouseMove(event: JQueryEventObject): void;
        resize(event: JQueryEventObject, quantity: number): void;
        checkFlexBox(element: ng.IAugmentedJQuery): void;
        refreshMousePos(event: JQueryEventObject): void;
        setMins(property: string): void;
        getQuantity(event: JQueryEventObject): number;
        canDrag(): boolean;
        checkResize(event: JQueryEventObject, quantity: number): boolean;
        initProxyPosition(element: ng.IAugmentedJQuery): void;
        setProxyPosition(element: ng.IAugmentedJQuery, value: number): void;
        getProxyStyle(): string;
        element: ng.IAugmentedJQuery;
        useProxy: boolean;
        proxy: IDraggableDelegate;
        mousePos: Position;
        controller: SplitterController;
        prev: ng.IAugmentedJQuery;
        next: ng.IAugmentedJQuery;
        draggable: ng.IAugmentedJQuery;
        id: string;
        minPrev: number;
        minNext: number;
    }
}

/**
 * Created by germonneauf on 06/05/2015.
 */
declare module ers.components.layout {
    class HorizontalSplitterDelegate extends SplitterDelegate implements IConfigurable {
        private static HORIZONTAL_SPLITTER_STYLE;
        private static HORIZONTAL_PROXY_SPLITTER_STYLE;
        constructor(element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService, useProxy?: boolean);
        configureElements($timeout: ng.ITimeoutService): void;
        getQuantity(event: JQueryEventObject): number;
        checkResize(event: JQueryEventObject, quantity: number): boolean;
        resize(event: JQueryEventObject, quantity: number): void;
        initProxyPosition(proxyElement: ng.IAugmentedJQuery): void;
        checkFlexBox(element: ng.IAugmentedJQuery): void;
        setProxyPosition(proxyElement: ng.IAugmentedJQuery, quantity: number): void;
        getProxyStyle(): string;
        minPrev: number;
        minNext: number;
    }
}

/**
 * Created by germonneauf on 15/06/2015.
 */
declare module ers.components.layout {
    class LayoutHelper {
        private static COLLAPSE_STATE;
        private static EXPAND_STATE;
        private _state;
        private _delegate;
        private _collapsedLayoutSize;
        private _collapsed;
        private _expanded;
        isPrevCollapsible: Function;
        isNextCollapsible: Function;
        constructor(delegate: ICollapsable, prevButton?: ng.IAugmentedJQuery, nextButton?: ng.IAugmentedJQuery);
        setCallback(element: ng.IAugmentedJQuery, oneSide: boolean): void;
        private setButtonCallback(button, prev, next, oneSide);
        protected onButtonClick(event: JQueryEventObject, collapsed: ng.IAugmentedJQuery, expanded: ng.IAugmentedJQuery): void;
        forceExpand(event: JQueryEventObject, collapsed: ng.IAugmentedJQuery, expanded: ng.IAugmentedJQuery, compute?: boolean): void;
        forceCollapse(event: JQueryEventObject, collapsed: ng.IAugmentedJQuery, expanded: ng.IAugmentedJQuery, compute?: boolean): void;
        protected addState(): void;
        protected removeState(): void;
        toggleState(state?: number): void;
        isPrevCollapsed(): boolean;
        isNextCollapsed(): boolean;
        isCollapsedLayout(layout: ng.IAugmentedJQuery): boolean;
        isCollapsedElement(element: ng.IAugmentedJQuery): boolean;
        isExpand(): boolean;
        state: number;
        isCollapsed(): boolean;
        delegate: ICollapsable;
        collapsed: ng.IAugmentedJQuery;
        expanded: ng.IAugmentedJQuery;
        collapsedLayoutSize: number;
    }
}

/**
 * Created by germonneauf on 17/06/2015.
 */
declare module ers.components.layout {
    class HorizontalCollapsibleDelegate extends HorizontalSplitterDelegate implements IConfigurable, ICollapsable {
        private static HORIZONTAL_COLLAPSE_STYLE;
        private static LEFT_COLLAPSED_STYLE;
        private static RIGHT_COLLAPSED_STYLE;
        private static COLLAPSED_TEXT_STYLE;
        private prevExpandedWidth;
        private nextExpandedWidth;
        private isExpandedWidthAvailable;
        constructor(element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService, useProxy?: boolean);
        configureElements($timeout: ng.ITimeoutService): void;
        onMouseDown(event: JQueryEventObject): void;
        onMouseUp(event: JQueryEventObject): void;
        doCollapse(event: JQueryEventObject, needResize?: boolean): void;
        doExpand(event: JQueryEventObject, needResize?: boolean): void;
        checkResize(event: JQueryEventObject, quantity: number): boolean;
        resize(event: JQueryEventObject, quantity: number): void;
        protected computedExpandedWidths(): void;
        protected computeCollapsedWidths(): void;
        protected computeCollapsedStyles(): void;
        protected computeExpandedStyles(): void;
        protected prevDelegate(): HorizontalCollapsibleDelegate;
        protected nextDelegate(): HorizontalCollapsibleDelegate;
        private delegateById(id);
        protected leftExpandOnMove(event: JQueryEventObject): void;
        protected rightExpandOnMove(event: JQueryEventObject): void;
        protected collapsedNode(show: boolean): void;
        protected getSummary(element: ng.IAugmentedJQuery): string;
        collapsedPx(): number;
        expandedPx(): number;
        setExpandedSizes(): void;
        helper: LayoutHelper;
    }
}


/**
 * Created by germonneauf on 06/05/2015.
 */
declare module ers.components.layout {
    class VerticalSplitterDelegate extends SplitterDelegate {
        private static VERTICAL_SPLITTER_STYLE;
        private static VERTICAL_PROXY_SPLITTER_STYLE;
        constructor(element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService, useProxy?: boolean);
        configureElements($timeout: ng.ITimeoutService): void;
        getQuantity(event: JQueryEventObject): number;
        checkResize(event: JQueryEventObject, quantity: number): boolean;
        resize(event: JQueryEventObject, quantity: number): void;
        minPrev: number;
        minNext: number;
        initProxyPosition(proxyElement: ng.IAugmentedJQuery): void;
        checkFlexBox(element: ng.IAugmentedJQuery): void;
        setProxyPosition(proxyElement: ng.IAugmentedJQuery, quantity: number): void;
        getProxyStyle(): string;
    }
}


/**
 * Created by germonneauf on 17/06/2015.
 */
declare module ers.components.layout {
    class VerticalCollapsibleDelegate extends VerticalSplitterDelegate implements IConfigurable, ICollapsable {
        /** Horizontal splitter CSS definition */
        private static VERTICAL_COLLAPSE_STYLE;
        private static UP_COLLAPSED_STYLE;
        private static DOWN_COLLAPSED_STYLE;
        private static VERTICAL_COLLAPSE_TEXT_STYLE;
        private prevExpandedHeight;
        private nextExpandedHeight;
        private isExpandedHeightAvailable;
        constructor(element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService, useProxy?: boolean);
        configureElements($timeout: ng.ITimeoutService): void;
        onMouseDown(event: JQueryEventObject): void;
        onMouseUp(event: JQueryEventObject): void;
        doCollapse(event: JQueryEventObject, needResize?: boolean): void;
        doExpand(event: JQueryEventObject, needResize?: boolean): void;
        checkResize(event: JQueryEventObject, quantity: number): boolean;
        resize(event: JQueryEventObject, quantity: number): void;
        protected computeExpandedHeights(): void;
        protected computeCollapsedHeights(): void;
        protected computeCollapsedStyles(): void;
        protected computeExpandedStyles(): void;
        protected prevDelegate(): VerticalCollapsibleDelegate;
        protected nextDelegate(): VerticalCollapsibleDelegate;
        private delegateById(id);
        protected upExpandOnMove(event: JQueryEventObject): void;
        protected downExpandOnMove(event: JQueryEventObject): void;
        protected collapsedNode(show: boolean): void;
        protected getSummary(element: ng.IAugmentedJQuery): string;
        collapsedPx(): number;
        expandedPx(): number;
        setExpandedSizes(): void;
        helper: LayoutHelper;
    }
}

/**
 * Created by germonneauf on 17/06/2015.
 */
declare module ers.components.layout {
    class DelegateFactory {
        static buildDelegate(element: ng.IAugmentedJQuery, ctrl: SplitterController, $timeout: ng.ITimeoutService): SplitterDelegate;
    }
}


/**
 * Created by germonneauf on 10/04/2015.
 */
declare module ers.components.layout {
    /**
     * SplitterController class
     * @class
     */
    class SplitterController extends ers.components.core.BaseController implements IResizableController {
        /** The splitter direction (horizontal/vertical) */
        private _direction;
        /** The ability to collapse/expand the neighborhood containers */
        private _collapsible;
        /** The ability to enable/disable "on the fly" resize. */
        private _proxy;
        /** The angular service for DOM document. */
        private document;
        /** The delegate which manages the behavior of the splitter. */
        private _delegate;
        /** Event resize callback. */
        private _onResize;
        /** Angular compile service */
        private _compile;
        /** Angular timer service */
        private _timeout;
        /**
         * List of resources to inject into the controller by Angular
         * @type {string[]}
         */
        static $inject: string[];
        /**
         * @constructor
         * @param $scope the isolate scope
         * @param $element the DOM representation of the directive
         * @param $document The angular service for DOM document.
         * * @param $compile the angular service for directive compilation
         */
        constructor($scope: ISplitterScope, $element: ng.IAugmentedJQuery, $document: ng.IDocumentService, $compile: ng.ICompileService, $timeout: ng.ITimeoutService);
        link($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attributes: ng.IAttributes): void;
        buildSplitter(): void;
        protected addListeners(): void;
        protected onMouseDown(event: JQueryEventObject): void;
        protected onMouseUp(event: JQueryEventObject): void;
        protected onMouseMove(event: JQueryEventObject): void;
        /**
         * resize event callback.
         */
        callTriggerResizeEvent(): void;
        delegate: SplitterDelegate;
        onResize(listener: Function): void;
        isCollapsible(): boolean;
        isResizable(): boolean;
        useProxy(): boolean;
        proxy: string;
        collapsible: string;
        direction: string;
    }
}


/**
 * Event constant
 */
declare module ers.components.core.event {
    /**
     * Interface of events
     */
    interface IEVENT {
        RESIZE: string;
    }
    /**
     * Utility which contains the event constants.
     */
    var EVENT: IEVENT;
}

declare module ers.components.layout {
    import IContainerEventService = ers.components.core.service.IContainerEventService;
    /**
     * LayoutController class
     * @class
     */
    class LayoutController extends ers.components.core.BaseController implements IResizableController, ICollapsibleController {
        /** Component constant name */
        private static CSS_NAME_CLASS;
        /** Layout direction */
        private _direction;
        /** Splitter activator */
        private _proxy;
        /** Collapse activator */
        private _collapsible;
        /** DOM main element for the component*/
        private _divContainer;
        /** Array of splitter */
        private _vSplitters;
        /** Angular compilation service. */
        private _compile;
        private _timeout;
        /** Event service use to manage the resize event */
        private containerEventService;
        private _obj;
        /**
         * List of resources to inject into the controller by Angular
         * @type {string[]}
         */
        static $inject: string[];
        /**
         * @constrcutor
         * @param $scope the isolate scope
         * @param $element the diretcive 's DOM element
         * @param $compile Angular service for compiling utility
         * @param containerEventService event resize manager
         */
        constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery, $compile: ng.ICompileService, $timeout: ng.ITimeoutService, containerEventService: IContainerEventService);
        /**
         * @function Angular link procedure. Add DOM elements depending on options set.
         * @param $scope the isolate scope
         * @param $element the directive 's DOM element
         * @param $attributes the attribute of the directive
         */
        link($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attributes: ng.IAttributes): void;
        protected buildWrappers(): void;
        protected buildSplitters(): void;
        private buildSplitterDirective();
        initializeSplitters(): void;
        protected buildCollapse(): void;
        setSummary(element: ng.IAugmentedJQuery, value: string): void;
        getSummary(element: ng.IAugmentedJQuery): string;
        private computeMins();
        private splitterMoved();
        private onResize();
        protected applyResize(): void;
        protected flexSizing(layout: ng.IAugmentedJQuery, direction: string): void;
        getSplitterById(id: string): SplitterDelegate;
        isCollapsible(): boolean;
        useProxy(): boolean;
        isResizable(): boolean;
        splitters: Array<SplitterDelegate>;
        direction: string;
        collapsible: string;
        proxy: string;
    }
}


/**
 * @ngdoc directive
 * @module ers.components.layout
 * @name ersLayout
 * @restrict E
 *
 * @description
 *
 * To organize the layout of your HTML content, use the `ers-layout` component. Create your
 * content horizontally or vertically. You can also nest this component for complex designs.
 *
 * <div style="position:relative;width:400px;height:200px">
 *     <ers-layout direction="vertical" ers-resize ers-collapse>
 *         <div id="fge-1" style="height:100%;width:100%;background:#f4f4f4" ers-layout-summary="Horizontal content collapsed">
 *         Horizontal Content
 *         </div>
 *
 *     <ers-layout direction="horizontal" ers-resize ers-collapse ers-layout-summary="Vertical panels collapsed">
 *         <div id="fge-2" style="height:100%;width:100%;background:#fafafa" ers-layout-summary="Vert 1 Collapse">
 *             Vertical Content 1
 *         </div>
 *
 *         <div id="fge-3" style="height:100%;width:100%;background:#fdfdfd" ers-layout-summary="Vert 2 Collapse">
 *             Vertical Content 2
 *         </div>
 *      </ers-layout>
 *      </ers-layout>
 * </div>
 *
 * `ers-layout` contains three components:
 *
 * - `ers-layout` is the container providing the display direction to all content or sections.
 *
 * - [ers-collapse](#/components/ersCollapse/documentation) provides layout resize, collapse, or expand capabilities.
 *
 * - [ers-layout-summary](#/components/ersLayoutSummary/documentation) allows you to specify a display message for
 * a collapsed component.
 *
 * For more information, see [Examples](#/components/ersLayout/examples).
 *
 * #### Visual Design Guidelines
 *
 * Use the `ers-layout` to arrange the display of your html page. The collapsible components can be stylized with CSS.
 *
 * ##### Styles
 *
 * `ers-layout` can be styled with CSS.
 *
 * ##### Best Practices
 *
 * Resizing a section of the layout is done immediately, as the mouse is moving. Depending on the size of the section,
 * extensive CPU use
 * is not unusual. To avoid excessive CPU use and visual slowdown, consider using the option `ers-resize="proxy"`
 * which delays the resize until the mouse button is released.
 *
 * #### Example
 *
 * The following example illustrates the code from the description display.
 *
 *
 * ```xml
 *  <ers-layout direction="horizontal">
 *    <div style="height:100%;width:100%">
 *     Horizontal Content 1
 *    </div>
 *    <div style="height:100%;width:100%">
 *     Horizontal Content 2
 *    </div>
 *    <ers-layout direction="vertical" ers-resize>
 *      <div style="height:100%;width:100%">
 *        Vertical Content 1
 *      </div>
 *      <div style="height:100%;width:100%">
 *        Vertical Content 2
 *      </div>
 *    </ers-layout>
 *   </ers-layout>
 * ```
 *
 * @param {string} [direction="horizontal"]
 * Sets the direction of the `ers-layout` content display.
 *
 * - `vertical` displays the content as a row.
 *
 * - `horizontal` (default) displays the content as a column.
 *
 *
 *
 *
 * @param {string} [ers-resize="direct"]
 *
 * Displays a splitter between sections of the layout.
 *
 * - `direct` or empty (default) - generates a splitter allowing users to resize the section. The resize is immediate.
 *
 * - `proxy` - generates a splitter allowing user to resize the section where the resize is delayed.
 *
 *
 * @param {string} [ers-collapse]
 *
 * Sets the optional layout to expand or collapse.
 *
 * - `onBothSide` or empty (default) - sets the splitter to collapse or expand the section layout.
 *
 * - `onTop` - collapses or expands the vertical content at the top of the section.
 *
 * - `onBottom` - collapses or expands the vertical content at the bottom of the section.
 *
 * - `onLeft` - collapses or expands the horizontal content at the left of the section.
 *
 * - `onRight` - collapses or expands the horizontal content at the right of the section.
 *
 *
 */
declare module ers.components.layout {
}


/**
 * Created by germonneauf on 06/07/2015.
 */
/**
 * @ngdoc directive
 * @module ers.components.layout
 * @name ersLayoutSummary
 * @restrict A
 *
 * @description Use `ers-layout-summary` to display text information when a layout is fully collapsed.
 * <!--[Layout](#/components/ersLayout/documentation)-->
 *
 *  <div style="width:400px;height:200px">
 *  <ers-layout direction="horizontal" ers-resize="" ers-collapse="horizontal">
 *  <div style="height:100%;width:100%" ers-layout-summary="Vertical content 1 is fully collapsed">
 *  Vertical Content 1
 *  </div>
 *  <div style="height:100%;width:100%" ers-layout-summary="Vertical content 2 is fully collapsed">
 *  Vertical Content 2
 *  </div>
 *   </ers-layout>
 *   </div>
 *
 * <div style="position:relative;width:400px;height:200px">
 * <ers-layout direction="horizontal" ers-resize ers-collapse="horizontal">
 * <div style="height:100%;width:100%;background:#f4f4f4" ers-layout-summary="horizontal collapse">
 * Horizontal Content 1
 * </div>
 * <ers-layout direction="vertical" ers-resize  ers-collapse="vertical">
 * <div  style="height:100%;width:100%;background:#fafafa" ers-layout-summary="Fully Collapsed.">
 * Vertical Collapse Content 1
 * </div>
 * <div  style="height:100%;width:100%;background:#fdfdfd">
 * Vertical Content 2
 * </div>
 * </ers-layout>
 * </ers-layout>
 * </div>
 *
 *
 *
 *
 * ##### Styles
 *
 * `ers-layout-summary` has default style or can be styled with standard CSS.
 *
 * #### Restriction
 *
 * `ers-layout-summary` is an attribute used with an `ers-layout` component in an HTML structure.
 *
 *
 * #### Example
 *
 * This following code sample illustrates the description example:
 *
 * ```xml
 *  <div style="width:400px;height:200px">
 *  <ers-layout direction="horizontal" ers-resize ers-collapse="vertical">
 *    <div style="height:100%;width:100%"
 *         ers-layout-summary="Vertical content 1 is fully collapsed">
 *     Vertical Content 1
 *    </div>
 *    <div style="height:100%;width:100%"
 *         ers-layout-summary="Vertical content 2 is fully collapsed">>
 *     Vertical Content 2
 *    </div>
 *   </ers-layout>
 *   </div>
 * ```
 */
declare module ers.components.layout {
}

/**
 * ngdoc directive
 * @module ers.components.layout
 * @name ersSplitter
 * @restrict E
 *
 * @description
 *
 * Use the `ers-splitter` component to add a splitter between two graphical containers or  sections. Use `ers-splitter`
 * inside the `ers-layout` component. `ers-splitter` is not a standalone component.
 *
 *
 *  <div style="width:200;height:200">
 *  <ers-layout direction="horizontal" style="width:100%;height:100%;background=#f2f2f2">
 *    <div style="height:100%; width: 100%">
 *     Horizontal Content 1</div>
 *    <ers-splitter ers-collapse></ers-splitter>
 *    <div style="height:100%; width: 100%">
 *     Horizontal Content 2</div>
 *    <ers-layout direction="vertical">
 *      <div style="height:100%;width:100%" ers-layout-summary="Vertical Content 1 collapsed message">
 *      Vertical Content 1</div>
 *      <ers-splitter ers-collapse></ers-splitter>
 *        <div style="height:100%;width:100%" ers-layout-summary="Vertical content 2 collapsed message">
 *          Vertical Content 2</div>
 *    </ers-layout>
 *   </ers-layout>
 *  </div>
 *
 * The splitter component:
 *
 * - `ers-splitter` is a graphical object which allows user to resize, collapse/expand its direct neighbor contents.
 * `ers-splitter` is used inside an `ers-layout`(#components/ersLayout/documentation).
 *
 * See the [showcase](#/components/ersLayout/showcase) for more information.
 *
 * #### Visual Design Guidelines
 *
 * Use the `ers-splitter` to the resize, collapse/expand a graphical container of your html page.
 * `ers-splitter` is a thin horizontal or vertical bar.
 *
 * ##### Styles
 *
 * `ers-splitter` has its own style, but can be themed using standard CSS.
 *
 * ##### Best Practices
 *
 * See best practice of the `ers-layout` documentation section [Layout](#/components/ersLayout/documentation).
 *
 * #### Example
 *
 * The following example displays the code from the description display.
 *
 *
 * ```xml
 *  <ers-layout direction="horizontal" style="width:100%;height:100%;background=#f2f2f2">
 *    <div style="height:100%;width:100%">
 *     Horizontal Content 1</div>
 *    <ers-splitter ers-collapse></ers-splitter>
 *    <div style="height:100%; width: 100%">
 *     Horizontal Content 2</div>
 *    <ers-layout direction="vertical">
 *      <div style="height:100%; width: 100%" ers-layout-summary="Vertical Content 1 collapsed message">
 *      Vertical Content 1</div>
 *      <ers-splitter ers-collapse></ers-splitter>
 *        <div style="height:100%;width:100%" ers-layout-summary="Vertical content 2 collapsed message">
 *          Vertical Content 2</div>
 *    </ers-layout>
 *   </ers-layout>
 * ```
 *
 * @param {string} [ers-resize] display a splitter between each section of the component.
 *
 * - `direct` or empty - a splitter is generated which allows user to resize the section.
 *
 * - `proxy` - a splitter is generated, but the resize is delayed and not immediate.
 *
 * Default value is `direct` or empty.
 *
 * @param {string} [ers-collapse] is an option that allow splitter to collapse/expand a layout content.
 *
 * - `onBothSide` or empty - Ability to collapse/expand section (layout).
 *
 * - `onTop` - Collapse/expand a vertical content by the Top.
 *
 * - `onBottom` - Collapse/expand a vertical content by the Bottom.
 *
 * - `onLeft` - Collapse/expand a horizontal content by the left.
 *
 * - `onRight` - Collapse/expand a horizontal content by the right.
 *
 * Default value is `onBothSide` or empty.
 *
 */
declare module ers.components.layout {
}


declare module ers.components.login {
    /**
     * Interface that stores message relative to an error while trying to log.
     * Used to transmit error results after login.
     */
    interface ILoginError {
        /**
         *  Message representing why login attempt fails.
         */
        message: string;
        /**
         * True if there is a credential error.
         */
        credentialsError: boolean;
    }
}


/**
 * Interface representing the data scope for the [[LoginDirective]].
 */
declare module ers.components.login {
    interface ILoginScope extends ng.IScope {
        /** Name of the product where the login is displayed. */
        productName: string;
        /** True if credentials must be retrieved. */
        isRetrieveCredentials: boolean;
        /** True if login must display several database. */
        isMultiBase: boolean;
        /** Array of database code. */
        databases: string[];
        /**
         *  the callback function following login action.
         *
         *  It allows to call a callback function on the login click.
         *
         *  This function MUST return a promise. If an error occurs during the login, this promise MUST be rejected with
         *  an ILoginError as argument.
         *  (ex : promise.reject({credentialsError: true, message: "bad password or username"})
         *
         *
         *  The callback function must respect this signature:
         *  ```typescript
         *   functionName(loginInfo:ILoginInfo):ng.IPromise<Object>  {
         *   }
         *
         *   ```
         *   and, the attribute tag must be the same as the below example (above all the `(loginInfo)`):
         *  ```xml
         *  <ers-login on-login="myCtrl.verifyLoginInfo(loginInfo)"></ers-login>
         *  ```
         */
        onLogin: Function;
    }
}



/**
 * @author BERTHETO
 * ERS Angular Controller : ersModalService.
 */
declare module ers.components.modal {
    /**
     * @ngdoc service
     * @module ers.components.modal
     * @name ersModalService
     *
     * @description
     *
     * Use this service to create display dialogs with rich content (templates), simple messages, or
     * pre-configured content like help, information, confirmation, or popup, type messages.
     */
    class ModalService {
        /**
         * The Ui-Boostrap modal service.
         */
        uiBstpModalService: ng.ui.bootstrap.IModalService;
        /**
         * The number of popup currently opened.
         */
        private popupOpened;
        /**
         * The current modal id incremented according to the popup opened.
         */
        private currentId;
        /**
         * Injector.
         */
        static $inject: string[];
        /**
         * Constructor.
         *
         * @param $modal The Ui-Boostrap modal service.
         */
        constructor($modal: ng.ui.bootstrap.IModalService);
        /**
         * @ngdoc method
         * @name ersModalService#informationDialog
         *
         * @description
         *
         * Displays an ***Informational*** modal window with a message, an  OK button, and an "x" to dismiss the dialog.
         *
         * @param {string} title the modal title.
         * @param {string} message the information message.
         * @param {Function} onClose the callback function triggered by the 'ok' button click. This callback is the same
         * than use the modalInstance returned and manage the result promise. If you specify this callback and in the same
         * time you managed the resolved state of the result promise, the 2 methods will be executed.
         *
         * @return {ng.ui.bootstrap.IModalServiceInstance} Returns an open `modalInstance`. This is object with the following
         * properties:
         *
         * - **close** (result) - the method used to pass a result and close the modal (window) with the OK button.
         *
         * - **dismiss** (reason) - the method used to pass a reason and close the modal (window) with the 'x'.
         *
         * - **result** - a promise that is *resolved* when the modal is "closed" (OK button) or *rejected*
         * when the modal is dismissed (closed with the 'x').
         *
         * - **opened** - a promise that is resolved when a modal is opened after downloading the
         * content's template and resolving all variables.
         *
         *
         */
        informationDialog(title: string, message: string, onClose?: Function): ng.ui.bootstrap.IModalServiceInstance;
        /**
         * @ngdoc method
         * @name ersModalService#errorDialog
         *
         * @description
         *
         * Displays an ***Error*** modal window with a message, an  OK button, and an "x" to dismiss the dialog.
         *
         * @param {string} title the modal title.
         * @param {string} message the error message.
         * @param {Function} onClose the callback function triggered by the 'ok' button click. This callback is the same
         * than use the modalInstance returned and manage the result promise. If you specify this callback and in the same
         * time you managed the resolved state of the result promise, the 2 methods will be executed.
         *
         * @return {ng.ui.bootstrap.IModalServiceInstance} Returns an open `modalInstance`. This is object with the following
         * properties:
         *
         * - **close** (result) - the method used to pass a result and close the modal (window) with the OK button.
         *
         * - **dismiss** (reason) - the method used to pass a reason and close the modal (window) with the 'x'.
         *
         * - **result** - a promise that is *resolved* when the modal is "closed" (OK button) or *rejected*
         * when the modal is dismissed (closed with the 'x').
         *
         * - **opened** - a promise that is resolved when a modal is opened after downloading the
         * content's template and resolving all variables.
         *
         *
         */
        errorDialog(title: string, message: string, choices?: IChoice[], onClose?: Function): ng.ui.bootstrap.IModalServiceInstance;
        /**
         * @ngdoc method
         * @name ersModalService#questionDialog
         *
         * @description
         *
         * Displays a ***Question*** modal window containing a message and multiple buttons. Each button returns a unique value
         * when the modal closes. All buttons are 'close' buttons.
         *
         * @param {string} Sets the modal window title.
         * @param {string} Sets the question message.
         * @param {IChoice[]} Defines the buttons.
         * @param {Function} onClose the callback function triggered by the buttons click. This callback is the same than
         * use the modalInstance returned and manage the result promise. If you specify this callback and in the same time
         * you managed the resolved state of the result promise, the 2 methods will be executed.
         *
         * @return {ng.ui.bootstrap.IModalServiceInstance} Returns an open `modalInstance`. This is object with the following
         * properties:
         *
         * - **close** (result) - the method used to pass a result and close the modal (window) with a button.
         *
         * - **dismiss** (reason) - the method used to pass a reason and close the modal (window) with the 'x'.
         *
         * - **result** - a promise that is *resolved* when the modal is "closed" (button) or *rejected*
         * when the modal is dismissed (closed with the 'x').
         *
         * - **opened** - a promise that is resolved when a modal is opened after downloading the
         * content's template and resolving all variables.
         *
         */
        questionDialog(title: string, message: string, choices: IChoice[], onClose?: Function): ng.ui.bootstrap.IModalServiceInstance;
        /**
         * @ngdoc method
         * @name ersModalService#confirmationDialog
         *
         * @description
         *
         * Displays an ***Confirmation*** modal window consisting of a message and yes/no buttons. Each button returns
         * a value when the modal closes. All buttons are 'close' buttons.
         *
         * @param {string} title the modal title.
         * @param {string} message the confirmation message.
         * @param {Function} onClose the callback function triggered by the buttons click. This callback is the same than
         * use the modalInstance returned and manage the result promise. If you specify this callback and in the same time
         * you managed the resolved state of the result promise, the 2 methods will be executed.
         * @param {string} [yesValue='yes'] the 'yes' button value to be returned during the close.
         * @param {string} [noValue='no'] the 'no' button value to be returned during the close.
         *
         * @return {ng.ui.bootstrap.IModalServiceInstance} Returns an open `modalInstance`. This is object with the following
         * properties:
         *
         * - **close**(result) - the method used to pass a result and close the modal (window) with a button.
         *
         * - **dismiss**(reason) - the method used to pass a reason and close the modal (window) with the 'x'.
         *
         * - **result** - a promise that is *resolved* when the modal is "closed" (OK button) or *rejected*
         * when the modal is dismissed (closed with the 'x').
         *
         * - **opened** - a promise that is resolved when a modal is opened after downloading the
         * content's template and resolving all variables.
         *
         *
         *
         */
        confirmationDialog(title: string, message: string, onClose: Function, yesValue?: string, noValue?: string): ng.ui.bootstrap.IModalServiceInstance;
        /**
         * @ngdoc method
         * @name ersModalService#customDialog
         *
         * @description
         *
         * Displays a ***Custom*** modal window providing either a simple message or complex content
         * (html template). When passing variables with `customDialog`, a controller must exist
         * inheriting values from `ModaController`. The template must define the controller name as 'ctrl', allowing you
         * to override the `onBefore` close/dismiss methods and manage the form for the validity of the button status and
         * error messages.
         *
         *
         *
         * <!-- For this dialog type, if you use a template for the content and you want to pass variables from the calling
         * screen to the dialog, you must have a controller inheriting from `ModalController` and the controller name in
         * your template must be `ctrl`. this inherited controller allows you to overide the onBefore close/dismiss methods,
         * manage the form validity (for the buttons status and error messages), etc.//-->
         *
         * @param {IModalInstanceOptions} pModalOptions modal configuration options
         * @param {object} modalVariables variables to be used by the modal content. (all the non configuration variables).
         * These variables  will be resolved and passed to the controller as locals; it is equivalent of the resolve
         * property for AngularJS routes. In the controller associated to your template, you must inject modalVariables
         * to retrieve these variables.
         *
         * @return {ng.ui.bootstrap.IModalServiceInstance} Returns an open `modalInstance`. This is object with the following
         * properties:
         *
         * - **close** (result) - the method used to close a modal, passing a result.
         *
         * - **dismiss** (reason) - the method used to dismiss a modal, passing a reason.
         *
         * - **result** - a [promise](#/getting-started/javascript) that is resolved when a modal is closed and rejected
         * when a modal is dismissed.
         *
         * - **opened** - a [promise](#/getting-started/javascript) that is resolved when a modal is opened after downloading the
         * content's template and resolving all variables.
         *
         *
         */
        customDialog(pModalOptions: IModalInstanceOptions, modalVariables?: {}): ng.ui.bootstrap.IModalServiceInstance;
        /**
         * @ngdoc method
         * @name ersModalService#openDialog
         *
         * @description
         *
         * Displays an ***Open*** a modal window allowing you to display either a simple or complex (html template)
         * message. When using `openDialog`, the variables are resolved and passed to the controller as local; the
         * equivalent of the Angular ***resolve*** property. In the controller associated with the template, you must inject
         * `modalVariables` to retrieve these variables.
         *
         *
         * @param {IModalInstanceOptions} pModalOptions Modal configuration options
         * @param {object} modalVariables Variables to be used by the modal content (all the non configuration variables).
         *
         * These variables  are resolved and passed to the controller as locals; it is equivalent of the resolve
         * property for AngularJS routes. In the controller associated to your template, you must inject modalVariables
         * to retrieve these variables.
         *
         * @param {string} pTemplateUrl A path to a template representing the modal's content. This is not the included
         * functional content (template or message) but the base UI of the modal (i.e. the main div/forms, buttons and basic
         * layout).
         *
         * @param {string} pTemplateControllerAs The `controllerAs` used by the modal template and the modal content
         * template.
         *
         * @return {ng.ui.bootstrap.IModalServiceInstance} Returns an open `modalInstance`. This is object with the following
         * properties:
         *
         * - **close** (result) - the method used to pass a result and close the  modal (window).
         *
         * - **dismiss** (reason) - the method used to pass a result and dismiss a modal (window).
         *
         * - **result** - a promise that is resolved when the modal,is closed and rejected when the modal is dismissed.
         *
         * - **opened** - a promise that is resolved when a modal is opened after downloading the
         * content's template and resolving all variables.
         *
         */
        private openDialog(pModalOptions, modalVariables?, pTemplateUrl?, pTemplateControllerAs?);
    }
}

/**
 * Created by bertheto on 06/04/2015.
 */
declare module ers.components.login {
    /**
     *
     * @ngdoc directive
     * @module ers.components.login
     * @name ersLogin
     * @restrict E
     *
     * @description
     *
     * Use `ers-login` component to display a login screen and, optionally, a change-password option screen.
     *
     * Traditionally, `ers-login` is used on a stand-alone page. You can, however, use it as a component
     * on a page with other components, or launch it as a modal dialog.
     *
     * The `ers-login` component controller does not manage the log in and change password operations,
     * it only allows the user to fill in user
     * information and launch login/change password commands.
     *
     * The functions associated with this controller are triggered by the login click ([onLogin](#onlogin))
     * and the change password request ([onChangePassword](#onchangepassword),
     * [onChangePasswordSuccess](#onchangepasswordsuccess)).
     *
  
     *
     * The following example displays the basic login UI:
     *
     * <div style="padding-bottom: 30px;">
     * <ers-login product-name="ERS UI"
     *      is-change-password="true"
     *      on-login="verifyLoginInfo(loginInfo)"
     *      on-change-password-success="displayNewPassword(closeModalResult)" databases="databases">
     * </ers-login>
     * </div>
     *
     * #### Visual Design Guidelines
     *
     * Login and Change Password components provide the customer-facing user-interface that runs the commands to securely
     * log in and log out of your application.
     *
     * Consider the following:
     *
     *  - Ensure that stand-alone login pages are clean and uncluttered.
     *
     *  - Consider a login link that displays a modal login.
     *
     *  - If Change Password is not part of the login screen, consider how to handle instances where a password must be changed.
     *
     * #### Example
     *
     * <div style="margin: 10px 0";>
     *
     * The example displayed in the description is based on the following code:
     *
     * </div>
     *
     * ```xml
     *
     * <ers-login product-name="ERS UI;"
     *         is-change-password="true"
     *         on-login="verifyLoginInfo(loginInfo)"
     *         on-change-password="verifyNewPassword(credentials)"
     *         on-change-password-success="displayNewPassword(closeModalResult)"
     *         databases="databases">
     * </ers-login>
     * ```
     *
     * @param {string} [product-name] Sets the name of the product.
     *
     * @param {boolean} [changePasswordOptions] Calls the change password dialog and provides two options:
     *
     * - onChangePassword - Sets the action to perform when a user clicks 'update' to verify the new password.
     * - onChangePasswordSuccess - Sets the action to perform at the end of the change password process, if no error
     * has occurred. Displays the change password success message.
     *
     * @param {string} [on-login] Sets the action performed when a user logs in. This function must return a promise.
     * When an error occurs during the login, the promise must update the error attribute to display the error message
     * on the login screen. *For example:*
     *
     * ```xml
     *  promise.reject({credentialsError: true, message: "bad password or username"})
     *  ```
     *
     * The callback function must use the following format:
     *
     * ```xml
     * functionName(loginInfo:ILoginInfo):ng.IPromise {
     * }
     * ```
     *
     * The attribute tag must use the following format:
     *
     * ```xml
     * <ers-login on-login="myCtrl.verifyLoginInfo(loginInfo)"></ers-login>
     *
     * ```
     *
     * @param {string} [changePasswordOptions] Sets the options available to the user changing their password.
     *
     * @param {string} [databases] Sets the appropriate database.
     *
     */
    class LoginComponent extends ers.components.core.BaseController {
        /**
         *  the callback function following login action.
         *
         *  It allows to call a callback function on the login click.
         *
         *  This function MUST return a promise. If an error occurs during the login, this promise MUST be rejected with
         *  an ILoginError as argument.
         *  (ex : promise.reject({credentialsError: true, message: "bad password or username"})
         *
         *
         *  The callback function must respect this signature:
         *  ```typescript
         *   functionName(loginInfo:ILoginInfo):ng.IPromise<Object>  {
         *   }
         *
         *   ```
         *   and, the attribute tag must be the same as the following example, before the `(loginInfo)`):
         *  ```xml
         *  <ers-login on-login="myCtrl.verifyLoginInfo(loginInfo)"></ers-login>
         *  ```
         */
        onLogin: Function;
        /**
         * the user name.
         */
        username: string;
        /**
         * the user password.
         */
        password: string;
        /**
         * the selected database.
         */
        selectedDbIndex: number;
        /**
         * <a name="databases"/>
         *  the databases list.
         *  ```xml
         *  <ers-login databases="myCtrl.databases"></ers-login>
         *  ```
         */
        databases: string[];
        /**
         * the error after a failed login.
         *
         * As the controller does not manage the real login process, if an error occurs after the [onLogin](#onlogin)
         * promise,  its the responsibility of the promise to update this error attribute to display the error
         * in the login screen.
         *
         */
        loginError: ILoginError;
        /**
         * the product name.
         * ```xml
         *  <ers-login  product-name="{{myCtrl.productName}}></ers-login>
         *  ```
         */
        productName: string;
        /**
         * true if the credentials could be memorized.
         * The screen change according to this parameter.
         * ```xml
         *  <ers-login remember-credentials="{{myCtrl.rememberCredentials}}"></ers-login>
         *  ```
         */
        /**
         * The change password options to configure the change-password modal.
         * If this is null, the change-password link is not displayed on the login screen.
         * ```xml
         *  <ers-login change-password-options="myCtrl.changePasswordOptions"></ers-login>
         *  ```
         */
        changePasswordOptions: ers.components.changePassword.IChangePasswordOptions;
        /**
         * the ERS modal service.
         */
        modalService: ers.components.modal.ModalService;
        /**
         * true if the screen is 'computing' (call the onLogin callback).
         * @type {boolean}
         */
        computing: boolean;
        static $inject: string[];
        /**
         * @constructor
         * @param $scope the isolated scope
         * @param ersModalService The modal service to display the change-password modal.
         */
        constructor($scope: ILoginScope, ersModalService: ers.components.modal.ModalService);
        /**
         * select the database entry by its index.
         * @param pIndex database index to select.
         */
        selectDb(pIndex: number): void;
        /**
         * The selected database getter
         * @return {string} the selected database name.
         */
        getSelectedDb(): string;
        /**
         * Login function : call the onLogin callback function with ILoginInfo parameters.
         */
        login(): void;
        /**
         * Test the database ddw visibility.
         * @return {boolean} true if the databases dropdown is vivible.
         */
        isDatabaseDdwVisible(): boolean;
        /**
         * login error getter
         * @return {string} the login error message
         */
        getErrorMessage(): string;
        /**
         * configure and open the change-password modal.
         */
        openChangePassword(): ng.ui.bootstrap.IModalServiceInstance;
    }
}


/**
 * Created by bertheto on 13/04/2015.
 */
/**
 * Interface representing the data scope for the [[modalScriptDirective]].
 */
declare module ers.components.modal {
    interface IModalScriptScope extends ng.IScope {
        /**
         * the dialog id.
         */
        modalId: string;
        /**
         * true if the dialog is modal, false if modaless
         */
        modal: boolean;
        /**
         * true if the dialog is resizable
         */
        resizable: boolean;
        /**
         * true if the dialog is draggable
         */
        draggable: boolean;
        /**
         * selector path to set the focus when the popup is open. This correspond to the path of an element in the modal
         * form. don't use '$' selector ! ex : ers-radio-group[name='sample.groupName']:first
         */
        focusPath: string;
    }
}


/**
 * Original notes from which this was rewritten
 * Generate the javascript to manage resizable, draggable, and modeless dialog behaviors.
 * the ModalService being only a set of services, templates and controller, the only way to manipulate the popup dom
 * is to use this directive( or use javascript in the modalTemplate.html)
 *
 * This is documented as the component, not the service.
 *
 */
declare module ers.components.modal {
}

declare module ers.components.core {
    import IValidationManager = ers.components.core.service.IValidationManager;
    import IValidationTarget = ers.components.core.service.IValidationTarget;
    import IValidationRule = ers.components.core.service.IValidationRule;
    /**
     * Component class which contains the commons behaviours between the form input (textbox, number, etc.).
     */
    class InputComponent extends BaseComponent implements IValidationTarget {
        /** The authorized values for the text alignment. */
        private static TEXT_ALIGN_VALUES;
        /**
         * Array which contains the setters ($set) to override in the input ngModelController (not the ngModelController of
         * the directive).
         * For information, the setter defined in the array below are overrode because we need to reverberate the state of the
         * wrapped input on the directive element.
         */
        static SETTER_TO_OVERRIDE: string[];
        /** The input name. */
        name: string;
        /**
         * (Optional)
         * The read only mode used on non-edit mode.
         * Expected values: true/false.
         * Default value: false.
         * Sample of the expected input display when the read only mode is activated: the input can
         * be without border, with a transparent background and a grey color as foreground color.
         */
        readOnly: boolean;
        /**
         * (Optional)
         * Attribute used to align the input value.
         * Expected values: 'right', 'left' or 'center'.
         * Default value: 'left'.
         */
        _textAlign: string;
        /**
         * (Optional)
         * Used to specify that the input value is required (true), or not (false).
         * Expected values: true/false.
         * Default value: false.
         */
        required: boolean;
        /**
         * (Optional)
         * User can specify a REGEXP in order to apply their own validation on the entered value.
         * Expected values: REGEXP.
         * Default value: none.
         */
        textPattern: string;
        /** The model controller which contains the ng-model value. */
        private _inputModelCtrl;
        /** Model controller on the directive.*/
        private modelCtrl;
        /** The component directive element. */
        private _inputComponent;
        /** Validation manager service. Used to register current controller as an IValidationTarget instance **/
        private vm;
        /** Exception handler service.*/
        private $exceptionHandler;
        /**
         * Attributes of the directive. For internal use only.
         */
        protected $attrs: ng.IAttributes;
        /**
         * Constructor of the base input component.
         *
         * @param $element The component element.
         * @param $timeout Angular timeout service. Currently used to execute a function when the model controller is fully loaded.
         */
        constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $timeout: ng.ITimeoutService, vm: IValidationManager, $exceptionHandler: ng.IExceptionHandlerService);
        /**
         * Method used to configure specifics rendering. Can be override by sub components.
         */
        protected configureRender(): void;
        /**
         * Method used to configure specifics validators. Can be override by sub components.
         */
        protected configParsers(): void;
        /**
         * Method used to configure specifics event listeners. Can be override by sub components.
         */
        protected configEventListeners(): void;
        /**
         * Method used to configure how to do when the the model controller is fully loaded. Can be override by sub components.
         */
        onModelCtrlLoaded(): void;
        /**
         * This function retrieves the model controller.
         * @returns {ng.INgModelController} Returns the model controller.
         */
        /**
         * This function set the model controller.
         * Can be override by sub component. (to apply specific parsers/formatters for example)
         * @param {ng.INgModelController} The new model controller to set.
         */
        inputModelCtrl: ng.INgModelController;
        /**
         * Get the input component.
         * @returns {ng.IAugmentedJQuery} Returns the input component.
         */
        /**
         * Set the new input component.
         * @param value the new input component.
         */
        inputComponent: ng.IAugmentedJQuery;
        /**
         * Get the chosen alignment.
         * @returns {string} Returns the chosen alignment (left, center or right).
         */
        /**
         * Set the chosen alignment, or left by default if the value is different than center or right.
         * @param newTextAlign the chosen alignment.
         */
        textAlign: string;
        /**
         * Apply text align to the underlyng input component.
         * @param newTextAlign Text Align value.
         */
        protected applyTextAlign(newTextAlign: string): void;
        /**
         * This method was created in addition to the "set textAlign" setter in order to give the ability to override the
         * default text align behaviours.
         * Set the chosen alignment, or left by default if the value is different than center or right.
         */
        protected setDefaultTextAlign(): void;
        /**
         * This function is used to compute the disabled property depending of the read-only property.
         * @returns Returns the computed disabled.
         */
        /**
         * Set the ng-disabled property with the user value.
         * @param disabled The ng-disabled value to set.
         */
        ngDisabled: boolean;
        inputElement(): ng.IAugmentedJQuery;
        validationRules(): IValidationRule[];
        ngModelController(): ng.INgModelController;
        /**
         * @returns {string} Returns the ID attribute of the current component.
         */
        id(): string;
    }
}


/**
 * This module contains and it will contains all the ERS filters available for the all components.
 */
declare module ers.components.core.filters {
}

declare module ers.components.numberbox {
    import InputComponent = ers.components.core.InputComponent;
    import IValidationManager = ers.components.core.service.IValidationManager;
    import IValidationRule = ers.components.core.service.IValidationRule;
    /**
     *
     * @ngdoc directive
     * @name ersNumber
     * @module ers.components.numberbox
     * @tag ers-number
     * @restrict E
     *
     * @description
     *
     * Use the `ers-number` component to creates a box which accepts only numbers as input, with keyboard shortcuts allowed
     * for number formatting:
     *
     * - M or m for million
     * - B or b for billion
     * - K or k for thousand
     * - % for percentage
     * - BP, Bp, bp, or bp for basepoint
     *
     * The following example
     * demonstrates a numberbox configured with a center alignment and a min max range between '1975' and '2025'.
     * Note the popover error message when the value falls outside of the min/max range.
     *
     * <style type="text/css">
     *  .labelStyles {
     *   position: relative;
     *   display: inline-block;
     *   width: 130px;
     * }
     *
     * .fieldStyles {
     *   position: relative;
     *   display: inline-block;
     *   width: 200px;
     *    margin-bottom: 10px;
     * }
     * </style>
     *
     * <div>
     *     <div class="labelStyles">
     *         <ers-label value="Numberbox Label" style="font-weight: bold" >
     *             </ers-label>
     * </div>
     *     <div class="fieldStyles">
     *         <ers-number name="ersNumber" max="2025" min="1975" ng-model="ersNumber" text-align="center">
     *             </ers-number>
     *     </div>
     * </div>
     *
     *
     *
     * #### Visual Design Guidelines
     *
     * When designing the size of the numberbox, anticipate the end-user's maximum data input.
     *
     *
     * #### Examples
     *
     * The following example displays the code from the description display.
     *
     *
     * ```
     *
     *  <ers-number name="ersNumber" max="2025" min="1975" ng-model="ersNumber" text-align="center">
     *      </ers-number>
     *
     * ```
     *
     *
     *
     * @param {string} name Sets the unique numberbox name.
     * ```
     *
     *  <ers-number name="ersNumber" max="2025" min="1975" ng-model="ersNumber" text-align="center"></ers-number>
     *
     * ```
     *
     *
     * @param {expression} ng-model Sets two-way data binding.
     *
     * @param {boolean} [ng-disabled=false] Sets the numberbox to read-only when used with the edit mode.
     *
     *
     * @param {expression} [ng-readonly=false] Sets the read-only mode.
     *
     * @param {expression} [ng-required=false]  Sets the text box value to required or not. The default is not required.
     *
     * @param {attribute} [min] Defines the minimum value that the user can enter.
     * into the numberbox.
     *
     * @param {attribute} [max]  Defines the maximum value that the user can enter.
     * into the numberbox.
     *
     * @param {attribute} [text-align=right] Sets the alignment of the text in the box. Available values are right, left,
     * and center.
     * ```xml
     * <ers-number name="ersNumber" max="2025" min="1975" ng-model="ersNumber" text-align="center"> </ers-number>
     * ```
     *
     * @param {attribute} [format="amount"] Sets the number format attribute to either 'amount', 'rate', 'short_percentage',
     * 'percentage' or 'basepoint'. The default value is "amount". Format shortcuts for the numberbox are:
     *
     * - M or m for million
     * - B or b for billion
     * - K or k for thousand
     * - % for percentage
     * - BP, Bp, bp, or bp for basepoint
     *
     */
    class NumberboxComponent extends InputComponent {
        /** The default format. */
        private static DEFAULT_FORMAT;
        /**
         * Authorized shortcuts facilities.
         */
        private static AUTHORIZED_SHORTCUTS;
        /** String that represents a number, is used inside NUMBER RegExp. */
        private static RE_NUMBER_PART;
        /**
         * REGEXP used to parse string in order to check if the contained value is an amount number.
         * Groups[0] = "([+-]?)([0-9]*([.]?[0-9]+)?)( ?(authorizedShortKey))?"
         * Groups[1] = "[+-]?"
         * Groups[2] = "[0-9]*([.]?[0-9]+)?"
         * Groups[3] = "[.]?[0-9]+"
         * Groups[4] = " ?(authorizedShortKey)"
         * Groups[5] = authorizedShortKey => Sample: "m|M|b|B|k|K|%|bp|BP|bP|Bp"
         */
        private static NUMBER_REGEXP_BASE;
        /** Array which contains the available format for the ers-number element. */
        private static AVAILABLE_FORMAT;
        /** Mapping to associate a specified format with a format function. */
        private numberFunctions;
        /** Attribute used to specify the number format to apply. */
        private _format;
        /** Model value stored on "focus-in" in order to be restored only if the ESC key of the keyboard is pressed. */
        private storedModelValue;
        /** Property to flag the focus state of this current web component. */
        private hasFocus;
        /** The web component model. Not the HTML input ngModel. */
        private _ngModelDirective;
        /** The Angular filter service. */
        private $filter;
        /**
         * (Optional)
         * Attribute used to add a MIN range constraint to the number entered by the user into the input.
         * Expected values: a number greater than/ or equals to 0.
         * Default value: none.
         */
        private _min;
        /**
         * (Optional)
         * Attribute used to add a MAX range constraint to the number entered by the user into the input.
         * Expected values: a number greater than/ or equals to 0.
         * Default value: none.
         */
        private _max;
        static $inject: string[];
        /**
         * Constructor.
         * @param $element The component element.
         * @param $filter The Angular filter service.
         * @param $timeout Angular timeout service. Currently used to execute a function when the model controller is fully loaded.
         */
        constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $filter: ng.IFilterService, $timeout: ng.ITimeoutService, vm: IValidationManager, $exceptionHandler: ng.IExceptionHandlerService);
        /**
         * Get the ngModel directive. Not the HTML input directive.
         * @returns {number} Returns the ngModel directive.
         */
        /**
         * Get the ngModel directive. Not the HTML input directive.
         * @param value The new value of the ngModel directive.
         */
        ngModel: number;
        /**
         * @returns {string} The current number format.
         */
        /**
         * Set the current number format.
         * @param value The format value. It will take its value among the following list:
         * <li>rate</li>
         * <li>amount</li>
         * <li>percentage</li>
         * <li>currency</li>
         * <li>basepoint</li>
         * If another value is given other than expected, the default `among` value will be used.
         */
        format: string;
        /**
         * This method was created in addition to the "set textAlign" setter in order to give the ability to override the
         * default text align behaviours.
         * Set the chosen alignment, or left by default if the value is different than center or right.
         */
        protected setDefaultTextAlign(): void;
        /**
         * @Override from InputComponent#configParsers.
         * Method used to configure specifics parsers.
         */
        protected configParsers(): void;
        /**
         * @Override from InputComponent#onModelCtrlLoaded.
         * Method used to configure how to do when the the model controller is fully loaded.
         */
        onModelCtrlLoaded(): void;
        /**
         * @Override from InputComponent#configEventListeners.
         * Method used to configure specifics event listeners.
         */
        protected configEventListeners(): void;
        /**
         * This function is used in focusout event and enter key event in order to apply a transformation
         * (parsing/filtering + formatting) on the entered number.
         */
        private transformation();
        /**
         * @Override from InputComponent#configureRender.
         * Method used to configure specifics rendering.
         */
        protected configureRender(): void;
        /**
         * Update the view value from the view value entered by the user in order to do computation if at least a shortcut
         * facility is found.
         */
        computeViewValue(): void;
        /**
         * This function parses the given value.
         * @param value {string} The value to parse.
         * @returns {string} Returns the parsed value, null if the given value is invalid.
         */
        private parseValue(value);
        /**
         * Apply the basepoint format.
         * @param value The value on which applying the format.
         * @returns {string} Returns the value formatted from the given value.
         */
        private static applyBasepointFormat(value);
        /**
         * Apply the percentage format.
         * @param value The value on which applying the format.
         * @returns {string} Returns the value formatted from the given value.
         */
        private static applyPercentageFormat(value);
        /**
         * Apply the "thousand" format.
         * @param value The value on which applying the format.
         * @returns {string} Returns the value formatted from the given value.
         */
        private static applyThousandFormat(value);
        /**
         * Apply the "million" format.
         * @param value The value on which applying the format.
         * @returns {string} Returns the value formatted from the given value.
         */
        private static applyMillionFormat(value);
        /**
         * Apply the "billion" format.
         * @param value The value on which applying the format.
         * @returns {string} Returns the value formatted from the given value.
         */
        private static applyBillionFormat(value);
        /**
         * This function test if the given string value is a number representation.
         * @param value The value to test.
         * @returns Returns `true` if the value is a string number representation, false otherwise.
         */
        private isNumber(value);
        /**
         * This function will be used to verify if the modelValue can be formated.
         * @returns {boolean} Returns true if the model value can be formated, false otherwise.
         */
        private isFormatable();
        /**
         * This function will apply an amount format on the number.
         */
        formatAmount(): void;
        /**
         * This function will apply a rate format on the number.
         */
        formatRate(): void;
        /**
         * This function will apply a percentage format on the number. (sample "83.233 %" => "83.23 %")
         */
        formatPercentage(): void;
        /**
         * This function will apply a short percentage format on the number. (sample "83.233 %" => "83 %")
         */
        formatShortPercentage(): void;
        /**
         * This function will apply a basepoint format on the number.
         */
        formatBasepoint(): void;
        /**
         * @Override from InputComponent#validationRules.
         * Method used to configure validation rules.
         */
        validationRules(): IValidationRule[];
        /**
         * @returns {number} min value
         */
        /**
         * Sets min value
         * @param value value to set
         */
        min: number;
        /**
         * @returns {number} max value
         */
        /**
         * Sets max value
         * @param value value to set
         */
        max: number;
    }
}



/**
 * Created by fangiot on 2/18/2015.
 */
/**
 * @ngdoc directive
 * @module ers.components.navigation
 * @name ersNavigationItem
 * @restrict E
 *
 * @description
 *
 * Use the `ers-nav-item` component to show a single navigation item or to group similar navigation items under a
 * common heading. When selected, the group expands to show any child navigation items.
 *
 * Add optional HTML to the `ers-nav-heading` element. Only text can be used in the `ers-nav-item`. Both are displayed
 * in the navigation menu.
 *
 * See the [Navigation Component](#/components/ersNavigation/documentation) for more information.
 *
 * #### Visual Design Guidelines
 *
 * See the [Navigation Component](#/components/ersNavigation/documentation) for more information.
 *
 * #### Example
 *
 * See the [Navigation Component](#/components/ersNavigation/documentation) for more information.
 *
 * @param {string} [heading]
 *
 * Sets the user supplied heading which is displayed for the item. In an attribute form, use only use plain text. Use
 * `ers-nav-heading` to enter an HTML heading, *for example*, icons or inputs.
 *
 * ```xml
 * <ers-nav>
 *   <ers-nav-item heading="Item 1"></ers-nav-item>
 *
 *   <ers-nav-item>
 *     <ers-nav-heading>
 *       <i class="fa fa-home"></i> Home
 *     </ers-nav-heading>
 *   </ers-nav-item>
 * </ers-nav>
 * ```
 *
 * @param {expression} [is-active]
 *
 * Use to bind data to the isActive property.
 *
 * **Note** The component is considered active after being selected using either the mouse or the keyboard.
 * When active, the group displays any child navigation items.
 *
 *
 * @param {boolean} [is-group = true]
 *
 * Sets the navigation item to display, or not, any children as a group.
 *
 */
declare module ers.components.navigation {
    import BaseController = ers.components.core.BaseController;
    interface INavigationItemScope extends ng.IScope {
        heading: string;
        isActive: boolean;
        isGroup: boolean;
    }
    /**
     * The controlling class for the Navigation Item Component.
     */
    class NavigationItemComponent extends BaseController {
        heading: string;
        isActive: boolean;
        isGroup: boolean;
        private $timeout;
        private parentNav;
        static $inject: string[];
        /**
         * Creates an instance of this component. This is called automatically by Angular.
         *
         * @param $scope The scope to which this component is bound.
         * @param $element The element to which this component is bound.
         * @param $timeout The Angular timeout service used for animations.
         */
        constructor($scope: INavigationItemScope, $element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService);
        /**
         * Called when an item is clicked/selected to notify the parent menu.
         */
        wantsActivation(): void;
        /**
         * Activate this navigation item.
         */
        activate(): void;
        /**
         * Deactivates this navigation item.
         *
         * Called by the parent navigation when another item is activated.
         */
        deactivate(): void;
        /**
         * Checks to see if we are a parent of the requested child.
         *
         * @returns True if we are a parent of the child.
         */
        isAncestorOf(child: NavigationItemComponent): boolean;
        /**
         * Setup some default values for scope objects.
         */
        private setupDefaults();
        /**
         * Add a class so we can target this in the CSS.
         */
        private setupBasicClasses();
        /**
         * Stores a reference to the parent navigation element and registers ourselves with it so we can send notifications.
         */
        private setupParentNavigation();
        /**
         * Setup necessary event listeners.
         */
        private setupEvents();
        /**
         * Setup necessary DOM watchers.
         */
        private setupWatchers();
        /**
         * Set the max-height property of the element so that we use as much space as available.
         */
        private layout();
        /**
         * Get the total height of multiple elements.
         *
         * @param elements The elements whose total height you want.
         *
         * @returns The total height of the elements.
         */
        private sumElementHeights(elements);
    }
}


/**
 * Created by fangiot on 2/18/2015.
 */
/**
 * @ngdoc directive
 * @name ersNavigation
 * @restrict E (element)
 * @module ers.components.navigation
 *
 * @description
 *
 * Use the `ers.components.navigation` to create a left-hand navigation menu for your application.  It can handle
 * both first-level
 * navigation items as well as secondary, grouped navigation items and includes the Moody's approved copyright
 * information.
 *
 *  <div style="position: relative; margin: 30px auto; width: 200px; height: 300px;">
 *      <ers-nav show-active="true">
 *          <ers-nav-item heading="Item 1"></ers-nav-item>
 *
 *
 *          <ers-nav-item>
 *              <ers-nav-heading>
 *                  Item 2
 *              </ers-nav-heading>
 *          </ers-nav-item>
 *
 *          <ers-nav-item is-group="true" heading="Group 1">
 *              <ers-nav-item heading="Sub Item 1-1"></ers-nav-item>
 *     <ers-nav-item heading="Sub Item 1-2"></ers-nav-item>
 *   </ers-nav-item>
 *
 *   <ers-nav-item is-group="true" heading="Group 2">
 *     <ers-nav-item heading="Sub Item 2-1"></ers-nav-item>
 *     <ers-nav-item heading="Sub Item 2-2"></ers-nav-item>
 *   </ers-nav-item>
 * </ers-nav>
 * </div>
 *
 *
 * `ers.components.navigation` contains three components:
 *
 *  - `ers-nav` - Responsible for housing all of the other directives and providing a
 *    wrapper for the navigation menu.
 *
 *  - [ers-nav-item](#/components/ersNavigationItem/documentation) - Used for showing items with a heading in the menu
 *  (including groups).
 *
 *  - [ers-nav-heading](#/components/ersNavigationItem/documentation) - Used to provide custom HTML for your item or
 *  group headings.
 *
 *
 * #### Visual Design Guidelines
 *
 *  Consider the following visual design guidelines when creating your navigation menu:
 *
 *  - Keep it simple.
 *
 *  - You can apply standard html and .css formatting and styles to the label.
 *
 *  - Be cautious when combining with other directives, like Tooltips.
 *
 *  - Be cautious when creating sub-navigation menus.
 *
 * ##### Styling
 *
 * The navigation component takes up the full space of its containing element and uses `absolute` positioning. This
 * means that the containing element must also use `absolute` or `relative` positioning so that the height and width are
 * properly calculated.
 *
 * <doc-note>The containing element should allow a minimum width of 160px and a maximum width of 330px.</doc-note>
 *
 * #### Example
 *
 *
 * The following example displays the code from the description example:
 *
 * ```xml
 * <ers-nav show-active="true">
 *   <ers-nav-item heading="Item 1"></ers-nav-item>
 *
 *   <ers-nav-item>
 *     <ers-nav-heading>
 *       Item 2
 *     </ers-nav-heading>
 *   </ers-nav-item>
 *
 *   <ers-nav-item is-group="true" heading="Group 1">
 *     <ers-nav-item heading="Sub Item 1-1"></ers-nav-item>
 *     <ers-nav-item heading="Sub Item 1-2"></ers-nav-item>
 *   </ers-nav-item>
 *
 *   <ers-nav-item is-group="true" heading="Group 2">
 *     <ers-nav-item heading="Sub Item 2-1"></ers-nav-item>
 *     <ers-nav-item heading="Sub Item 2-2"></ers-nav-item>
 *   </ers-nav-item>
 * </ers-nav>
 *  ```
 *
 * @param {boolean} [show-active=false]
 *
 * Sets whether or not the `active` class is applied to the elements for styling purposes.
 *
 */
declare module ers.components.navigation {
    import BaseController = ers.components.core.BaseController;
    /**
     * The controlling class for the Navigation Component.
     */
    class NavigationComponent extends BaseController {
        showActive: boolean;
        static $inject: string[];
        private children;
        /**
         * Creates an instance of this component. This is called autmoatically by Angular.
         *
         * @param $scope The scope to which this component is bound.
         * @param $element The element to which this component is bound.
         * @param $timeout The Angular $timeout service used for synchronizing window timeout events.
         */
        constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService);
        /**
         * Allows a child to register with this navigation component.
         *
         * @param child The child to be registered.
         */
        registerChild(child: NavigationItemComponent): void;
        /**
         * Deregisters a child so it no longer receives notifications.
         *
         * @param child The child to be deregistered.
         */
        deregisterChild(child: NavigationItemComponent): void;
        /**
         * All children of the navigation component call this method to activate themselves and let the component
         * de-activate the other children.
         */
        activateChild(activeChild: NavigationItemComponent): void;
        /**
         * Setup our default variables.
         */
        private setupDefaults();
        /**
         * Add a class so we can target this in the CSS.
         */
        private setupBasicClass();
        /**
         * Add the first-item class to the first nav item in each group. This is necessary because the CSS first-child might
         * be the nav-heading element, but might not.
         */
        private setupFirstItemClass($timeout);
        /**
         * Set the menu's bottom property to equal the height of the footer so the entire menu is visible.
         */
        private setMenuBottom();
    }
}

declare module ers.components.popover {
    /**
     * All configurable properties of a pop instance
     */
    interface IPopOptions {
        /**
         * Trigger way of tooltip or popover.
         * Expected values: 'click', 'focus', 'hover'
         *
         * @default "click" for popover
         * @default "hover" for tooltip
         *
         * ### Examples
         *
         * Tooltip:
         * ```xml
         *     <input type="text" ers-tooltip
         *            tt-title="Tooltip triggered by focus"
         *            tt-trigger="focus" />
         * ```
         *
         * Popover:
         * ```xml
         *     <button ers-popover
         *             po-trigger="hover">
         *          A button
         *     </button>
         * ```
         */
        trigger: string;
        /**
         * Position relative to anchor.
         * Expected values: 'left', 'right', 'top', 'bottom', 'auto left', 'auto right', 'auto top', 'auto bottom'
         *
         * @default 'auto left'
         *
         * If set with auto, popover instance will be placed at opposite side when specified placement is not possible.
         * Otherwise popover will always be placed as specified
         *
         * ### Examples
         *
         * Tooltip:
         * ```xml
         *     <input type="text" ers-tooltip
         *            tt-title="Tooltip triggered by focus"
         *            tt-placement="left" />
         * ```
         *
         * Popover:
         * ```xml
         *     <button ers-popover
         *             po-placement="top">
         *          A button
         *     </button>
         * ```
         */
        placement?: string;
        /**
         * Selector of a existing node to pop. Support CSS selector.
         *
         * @default null
         *
         * ### Examples
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-target="#popover1">
         *             Popover from after DOM
         *     </button>
         *     <div id="popover1" class="popover">
         *        <h3 class="popover-title">#popover1 from after the button</h3>
         *        <div class="popover-content">
         *        <p>This is a <b>HTML</b> text</p>
         *     </div>
         * ```
         */
        target?: string;
        /**
         * Template of a popover or tooltip. Could be an url of html file or a string of html segment
         *
         * @default null
         *
         * ### Examples
         * Specify an url:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-template="components/popover/dynamicTemplate.html">
         *             Popover by url
         *     </button>
         * ```
         *
         * Specify an html string
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-template="<div class='popover'><h3 class='popover-title'>title</h3><div class='popover-content'>content</div></div>"
         *             Popover by HTML string
         *     </button>
         * ```
         */
        template?: string;
        /**
         * True to enable the title of tooltip, content of popover to to render an html string
         *
         * @default false
         *
         * ### Examples
         *
         * Popover:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-title="Hello"
         *             po-content="<b>World</b>"
         *             html="true">
         *             A button
         *     </button>
         * ```
         *
         * Tooltip:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-tooltip
         *             tt-title="Hello <b>World</b>"
         *             html="true">
         *             A button
         *     </button>
         * ```
         */
        html?: boolean;
        /**
         * The container node which pop instance node is appended to. If not specified, the pop instance node will be appended to html body.
         * Support CSS selector.
         *
         * @default "body"
         *
         * ### Examples
         *
         * Popover:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-container="#container">
         *             A button
         *     </button>
         *     <div id="container"/>
         * ```
         *
         * Tooltip:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-tooltip
         *             tt-title="Hello <b>World</b>"
         *             tt-container="#container">
         *             A button
         *     </button>
         *     <div id="container"/>
         * ```
         */
        container?: string;
        /**
         * Delay in ms to show up the pop instance when triggered
         *
         * @default 500 for tooltip
         * @default 0 for popover
         *
         * ### Examples
         *
         * Popover:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-show-delay="1000">
         *             ...
         *     </button>
         * ```
         *
         * Tooltip:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-tooltip
         *             tt-title="Hello <b>World</b>"
         *             tt-show-delay="1000">
         *             ...
         *     </button>
         * ```
         */
        showDelay?: number;
        /**
         * Delay in ms to hide the pop instance when untriggered
         *
         * @default 0
         *
         * ### Examples
         *
         * Popover:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-hide-delay="1000">
         *             ...
         *     </button>
         * ```
         *
         * Tooltip:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-tooltip
         *             tt-title="Hello <b>World</b>"
         *             tt-hide-delay="1000">
         *             ...
         *     </button>
         * ```
         */
        hideDelay?: number;
        /**
         * Specify if only one pop instance can be showed up at a time.
         *
         * @default true
         *
         * ### Examples
         *
         * Popover:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-clear-exists="false">
         *             ...
         *     </button>
         * ```
         *
         * Tooltip:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-tooltip
         *             tt-title="Hello <b>World</b>"
         *             tt-clear-exists="false">
         *             ...
         *     </button>
         * ```
         */
        clearExists?: boolean;
        /**
         * Specify if arrow is displayed with pop instance. Only effective when no template or target is specified.
         *
         * @default true
         *
         * ### Examples
         *
         * Popover:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-show-arrow="false">
         *             ...
         *     </button>
         * ```
         *
         * Tooltip:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-tooltip
         *             tt-title="Hello <b>World</b>"
         *             tt-show-arrow="false">
         *             ...
         *     </button>
         * ```
         */
        showArrow?: boolean;
        /**
         * Specify if the pop instance be intialized only when being showed up for the first time rather than created.
         *
         * @default true
         *
         * ### Examples
         *
         * Popover:
         * ```xml
         *     <button class="btn btn-default"
         *             ers-popover
         *             po-lazy-load="false">
         *             ...
         *     </button>
         * ```
         * Tooltip:
         *  ```xml
         *     <button class="btn btn-default"
         *             ers-tooltip
         *             tt-title="Hello <b>World</b>"
         *             tt-lazy-load="false">
         *             ...
         *     </button>
         * ```
         */
        lazyLoad?: boolean;
        /**
         * Similar to target, but a real jquery node rather than selector string.
         *
         * @default null
         *
         */
        targetElement?: ng.IAugmentedJQuery;
        /**
         * Specify the scope object that the pop instance node will be linked with.
         * If not specified, pop instance will be linked to a scope inherited from root scope.
         *
         * @default null
         *
         */
        $scope?: ng.IScope;
        /**
         * The type name of the instance. For tooltip, instanceName="tooltip", for popover, instanceName="popover"
         *
         * @default null
         *
         */
        instanceName?: string;
        /**
         * The style of pop instance. Only effective for tooltip.
         * Expected values: 'info', 'success', 'danger', 'error'
         *
         * ### Example
         * ```xml
         *     <button class="btn btn-default"
         *             ers-tooltip
         *             tt-theme="info">
         *             ...
         *     </button>
         * ```
         * @default null
         *
         */
        theme?: string;
        /**
         * If true, the pop instance can be hided when press esc.
         *
         * @default false
         */
        keyboard?: boolean;
        /**
         * If true and trigger is 'focus', the anchor node will blur when pop instance hide.
         *
         * @default false
         */
        blur?: boolean;
        /**
         * Class name that will be add to pop instance node.
         *
         * @default "popover" for popover
         * @default "tooltip" for tooltip
         */
        typeClass?: string;
        /**
         * Pop title, will be set into the scope of pop instance, support HTML when html set as true
         *
         * @default null
         */
        title?: string;
        /**
         * Pop Content, will be set into the scope of pop instance, support HTML when html set as true
         *
         * @default null
         */
        content?: string;
        /**
         * Pop ID in order to identify the generated DOM.
         */
        id?: string;
    }
}

declare module ers.components.popover {
    /**
     * A generic factory for both [[ITooltip]] and [[IPopover]]
     */
    interface IPopManager {
        /**
         * Create an new instance of [[IPopInstance]], could be a [[ITooltip]] or [[IPopover]]
         *
         * @param host The anchor element of the pop instance to create
         * @param options Configurations of the created pop instance
         */
        pop(host: ng.IAugmentedJQuery, options: IPopOptions): IPopInstance;
    }
}

declare module ers.components.popover {
    /**
     *  A common interface of tooltip or popover instance
     */
    interface IPopInstance {
        /**
         * Called to get the host element
         */
        host(): ng.IAugmentedJQuery;
        /**
         * Called to destroy the pop instance
         */
        destroy(): void;
        /**
         * Called to show up the pop instance in UI if it is hided
         * @param callback will be called after the show action completes
         */
        show(callback?: () => void): void;
        /**
         * Called to hide the pop instance if the it is shown
         * @param callback will be called after the hide action completes
         */
        hide(callback?: () => void): void;
        /**
         * @returns the scope object of the pop instance
         */
        scope(): IPopInstanceScope;
    }
}

declare module ers.components.popover {
    /**
     * Interface representing the data scope inside a pop instance.
     */
    interface IPopInstanceScope extends ng.IScope {
        /**
         * Hide the pop instance which the scope belongs to. Same as [[IPopInstance.hide]]
         */
        hide: () => void;
        /**
         * Indicate current pop instance is shown or hided
         */
        isShown: boolean;
        /**
         *  Title of the pop instance instance which the scope belongs to.
         *  Normally set by the attribute @tt-title of directive [[TooltipDirective]]
         *  or the attribute @po-title of directive [[PopoverDirective]].
         */
        title?: string;
        /**
         *  Content of the pop instance instance which the scope belongs to.
         *  Normally set by or the attribute @po-content of directive ([[PopoverDirective]].
         *  Not available when the scope belongs to a tooltip instance ([[ITooltip]])
         */
        content?: string;
        /**
         * The ID defined by the user in the ID attribute of the pop instance, otherwise generated from the component ID
         * which is associated with this pop instance.
         */
        id: string;
    }
}

declare module ers.components.popover {
    /**
     * Interface of a popover instance. Currently no difference from [[IPopInstance]]
     */
    interface IPopover extends IPopInstance {
    }
}

declare module ers.components.popover {
    /**
     * Interface of a popover factory
     */
    interface IPopoverService {
        /**
         * Create a new popover instance
         *
         * @param element The anchor element of the popover to create
         * @param attr The html attributes specified in the anchor element
         * @param config The configurations that will override the properties specified by attr
         *
         * @returns a [[IPopover]] instance
         */
        createPopover(element: ng.IAugmentedJQuery, attr: ng.IAttributes, config?: IPopOptions, defaultConfig?: IPopOptions): IPopover;
    }
}

declare module ers.components.popover {
    /**
     * Internally used only for popover & tooltip component. See [[TooltipService]], [[PopoverService]]
     *
     * @Singleton
     * @type {{
     *      bindAttrToScope: (function(ng.IAttributes, ng.IScope, string[], string=, function(string): string=): undefined),
     *      parseOptions: (function(ng.IAttributes, string=): IPopOptions), docHeight: (function(): number)
     *  }}
     */
    var popoverUtils: {
        bindAttrToScope(attr: ng.IAttributes, scope: ng.IScope, keys: string[], prefix?: string, filter?: (s: string) => string): void;
        parseOptions: (attr: ng.IAttributes, prefix?: string) => IPopOptions;
    };
}


/**
 * Created by zhangfa on 3/18/2015.
 */
declare module ers.components.popover {
    var _module: ng.IModule;
}


declare module ers.components.radioButtons {
    /**
     * Radio button scope which provides the properties used in the controller.
     */
    interface IRadioButtonScope extends ng.IScope {
        /** Radio button value. */
        value: Object;
        /** Property to specified if a radio button will be disabled or not. */
        disabled: boolean;
    }
}


declare module ers.components.radioButtons {
    /**
     * Radio group scope which provides the properties used in the controller.
     */
    interface IRadioGroupScope extends ng.IScope {
        /** The radio button group name. */
        name: string;
        /** Property to specified if a radio button will be disabled or not. */
        disabled: boolean;
        /** Property to specified if a radio button will be read only or not. */
        readonly: boolean;
        /** Used to specify that a radio button among the radio group must be selected (true), or not (false). */
        required: boolean;
    }
}


declare module ers.components.radioButtons {
    import IValidationManager = ers.components.core.service.IValidationManager;
    import IValidationTarget = ers.components.core.service.IValidationTarget;
    import IValidationRule = ers.components.core.service.IValidationRule;
    /**
     * Radio Buttons Group Controller.
     */
    class RadioGroupController extends ers.components.core.BaseController implements IValidationTarget {
        /** This property is the name of the grouo radio component in the form. */
        name: string;
        /** Property to specified if a radio button will be disabled or not. */
        disabled: boolean;
        /** Property to specified if a radio button will be read only or not. */
        readonly: boolean;
        /** Used to specify that the radio button selection is required (true), or not (false). */
        required: boolean;
        /** The array of radio buttons contained in this radio group. */
        private radioButtonControllers;
        /** The model controller which contains the ng-model value. */
        private modelCtrl;
        /** Last tab index used to save/restore the tab index on the current element. */
        private lastTabIndex;
        /** Property used to flag the radio group is created. */
        private _componentCreated;
        /** Validation manager service. Used to register current controller as an IValidationTarget instance **/
        private vm;
        /** Angular service injection. */
        static $inject: string[];
        /**
         * Constructor.
         * @param $scope the component scope.
         * @param $attrs Directive attributes.
         */
        constructor($scope: IRadioGroupScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, vm?: IValidationManager);
        /**
         * Configure the directive attributes observers.
         * @param $attrs Directive attributes.
         */
        private configureObservers($attrs);
        /**
         * Set the focus flag on the the select radio button if not disabled, or on the first not disabled radio button.
         */
        setFocusFlag(): void;
        /**
         * Set the model controller.
         * @param pNgModelCtrl The model controller.
         */
        setNgModelController(pNgModelCtrl: ng.INgModelController): void;
        /**
         * This function will be used to check if the model controller is already defined.
         * @returns {boolean} Returns true if the model controller is set already in the group controller, false otherwise.
         */
        isModelDefined(): boolean;
        /**
         * Registering of the render of the radio button onto the group controller.
         * @param rbRender The render to register.
         */
        addRadioButtonController(rbRender: RadioButtonController): void;
        /**
         * Remove the render of the radio button from the group controller.
         * @param rbRender The render to remove.
         */
        removeRadioButtonController(rbRender: RadioButtonController): void;
        /**
         * Get the the number of radio buttons.
         * @returns {number} Returns the number of radio buttons contained in this radio group.
         */
        getNumberOfRadioButtons(): number;
        /**
         * This function knows how to do the rendering of the radio group.
         */
        render(): void;
        /**
         * This function is used to know if there is a radio button which is selected in this radio group.
         * @returns {boolean} Returns true if a radio button is selected, false otherwise.
         */
        private isRadioButtonChecked();
        /**
         * This function is used to know if there is at least one enabled radio button.
         * @returns {boolean} Returns true there is at least one enabled radio button, false otherwise.
         */
        private isRadioButtonEnabled();
        /**
         * Change the radio group's selected button by a given increment.
         * If no button is selected, select the first button.
         */
        private changeSelectedButton(increment);
        /**
         * This function is used to select the previous radio button.
         * If there is no previous radio button, the last one is selected.
         * If there is no current radio button selected, the first one is checked.
         */
        private selectPrevious();
        /**
         * This function is used to select the next radio button.
         * If there is no next radio button, the first one is selected.
         * If there is no current radio button selected, the first one is checked.
         */
        private selectNext();
        /**
         * This function is used to manage the radio button behaviour when arrow keyboard is pressed.
         * @param ev (JQueryEventObject) Event to catch the keycode used.
         */
        keydownListener(ev: JQueryEventObject): void;
        /**
         * This function is used to activate or deactivate (depending on the disabled group value) the focus on the radio
         * group via the tab index.
         * @param $element (ng.IAugmentedJQuery) Element on which update tab index.
         */
        updateTabIndex(): void;
        /**
         * @returns {boolean} Returns true if the radio group is already created, false otherwise.
         */
        /**
         * Function used to flag that the radio group is created.
         * @param created true if the radio group is already created, false otherwise.
         */
        componentCreated: boolean;
        /**
         * Set the view value of the radio group.
         * @param value The new value to set into the model.
         * @param event The event (trigger) source.
         */
        setViewValue(value: Object, event: string): void;
        /**
         * Get the model value of the radio group.
         * @returns Returns the model value.
         */
        getViewValue(): Object;
        /**
         * This function is used to focused artificially the radio group.
         */
        focus(): void;
        inputElement(): ng.IAugmentedJQuery;
        validationRules(): IValidationRule[];
        ngModelController(): ng.INgModelController;
        /**
         * @returns {string} Returns the ID attribute of the current component.
         */
        id(): string;
    }
}


declare module ers.components.radioButtons {
    /**
     * Radio Buttons Button Controller.
     */
    class RadioButtonController extends ers.components.core.BaseController {
        /** Property to specified if a radio button will be disabled or not. */
        disabled: boolean;
        /** Radio button value. This is not the model but the configured value. */
        value: Object;
        /** Current radio button CSS class. (checked, unchecked, on disabled mode, readonly mode or simple display) */
        private rbClass;
        /** The group controller used to access to the group model. */
        private groupCtrl;
        /** Property used to store the last state of the associated radio button. */
        private lastChecked;
        /** Property used to store the last state of the "disabled" property on the associated radio button. */
        private lastDisabled;
        /** Property used to store the last state of the "readonly" property on the radio group. */
        private lastReadonly;
        /** Angular service injection. */
        static $inject: string[];
        /**
         * Constructor.
         * @param $scope the component scope.
         */
        constructor($scope: IRadioButtonScope, $element: ng.IAugmentedJQuery);
        /**
         * This function will be used to associate the radio group controller with this radio button controller.
         * @param pGroupCtrl The radio group controller.
         * @param groupModel The group model which will be used to set the group model contained in the group controller
         * if it was not already set.
         */
        setGroupCtrl(pGroupCtrl: RadioGroupController, groupModel: ng.INgModelController): void;
        /**
         * This function will be used to get the last state (checked/unchecked) of the radio button.
         * @returns {boolean} Returns true if the last state of the radio button is checked, false otherwise.
         */
        getLastChecked(): boolean;
        /**
         * This function knows how to do the rendering of the radio button and returns the current state of radio button
         * (checked or unchecked).
         * @returns {boolean} Returns true if the radio button is checked or false if the radio button is unchecked.
         */
        render(): void;
        /**
         * This function is used to calculate the CSS class to used for the radio button display.
         * @returns {string} The calculated CSS class. The possible values are:<br>
         *   <li><b>checked</b>: radio button is checked and normal (clickable).</li>
         *   <li><b>unchecked</b>: radio button is unchecked and normal (clickable).</li>
         *   <li><b>checked disabled</b>: radio button is checked and disabled.</li>
         *   <li><b>unchecked disabled</b>: radio button is unchecked and disabled.</li>
         *   <li><b>checked readonly</b>: radio button is checked and readonly.</li>
         *   <li><b>unchecked readonly</b>: radio button is unchecked and readonly.</li>
         */
        private getCSSClass();
        /**
         * Remove the focus flag CSS from this current radio button.
         */
        removeFocusFlag(): void;
        /**
         * Add the focus flag CSS to this current radio button.
         */
        addFocusFlag(): void;
    }
}


declare module ers.components.radioButtons {
}

/**
 * ERS Angular Directive : ers-radio-group.
 * Radio buttons component.
 */
declare module ers.components.radioButtons {
}


declare module ers.components.shell {
    /**
     * IShellModule Interface representing the shell Module.
     */
    interface IShellModule extends ng.IModule {
        stateProvider: ng.ui.IStateProvider;
        urlRouterProvider: ng.ui.IUrlRouterProvider;
    }
}


declare module ers.components.core {
    interface INavigationItem {
        /** Label. */
        label: string;
        /** true to collapse the navigation after the navigation item is selected. */
        collapseNavigation: boolean;
        /** Action. */
        action: string;
        /** False if the parameter must be hidden in the accordion. */
        visible: boolean;
        /** parameters for the action. */
        parameters: Object[];
        /** true if the item is a navigation group. */
        /** childrens. */
        navigationItems: INavigationItem[];
    }
}

declare module ers.components.core {
    /**
     * Interface representing a product in the product selector.
     */
    interface IProduct {
        label: string;
        code: string;
        url: string;
        templateUrl: string;
        controller: string;
        navigation: INavigationItem[];
    }
}


declare module ers.components.core {
    interface IUserInfo {
        id: number;
        name: string;
        lastLogin: string;
    }
}


declare module ers.components.shell {
    import IProduct = ers.components.core.IProduct;
    import IUserInfo = ers.components.core.IUserInfo;
    /**
     * IShellScope Interface representing the scope for the shell component.
     */
    interface IShellScope extends ng.IScope {
        /**
         * the onSettings callback triggered when the settings icon is clicked
         */
        onSettings: Function;
        /**
         * the onInfo callback triggered when the info icon is clicked
         */
        onInfo: Function;
        /**
         * the onHelp callback triggered when the help icon is clicked
         */
        onHelp: Function;
        /**
         * the onEditProfile callback triggered when the edit profile link is clicked
         */
        onEditProfile: Function;
        /**
         * the onLogout callback triggered when the logout link is clicked
         */
        onLogout: Function;
        /**
         * the onContextSelector callback triggered when the context likn is clicked
         */
        onContextSelector: Function;
        /**
         * the products list for the product selector
         */
        products: IProduct[];
        /**
         * the products list for the product selector
         */
        currentProduct: IProduct;
        /**
         * the user currently logged.
         */
        userInfo: IUserInfo;
        /**
         * the current selected context.
         */
        currentContext: string;
    }
}

declare module ers.components.shell {
    /**
     * ITopShellScope Interface representing the scope for the top shell component.
     */
    interface ITopShellScope extends IShellScope {
        /**
         * the onProductChange callback triggered when a product is selected in the product selector
         */
        onProductChange: Function;
    }
}


/**
 * Created by bertheto on 06/04/2015.
 */
declare module ers.components.shell {
    import IProduct = ers.components.core.IProduct;
    import IUserInfo = ers.components.core.IUserInfo;
    /**
     * ### Shell Component
     *
     * Displays the shell screen and its sub components (product selector, topshell, viewport).
     *
     * The shell component will display the Shell with two main parts : The topshell and the the viewport.
     *
     * The **Top Shell** is composed by a **Product Selector** and a **Toolbar** with different links, icons and menu.
     *
     * All of the links and icons are only able to trigger external actions on the click, so you have to configure
     * all the callback attributes if you want to utilize these actions.
     *
     * The current context, user and product are managed by the shell component.
     *
     * The product selection will set current product and display the corresponding product url in the viewport,
     * by a route mechanism.
     *
     *  ### Available Options
     *
     * The following are the options available for the Shell component:
     *
     * * [onSettings](#onsettings), [onInfo](#oninfo), [onHelp](#onhelp), [onProductChange](#onproductchange),
     * [onAfterProductChange](#onAfterProductChange),
     * [onLogout](#onlogout),[onEditProfile](#oneditprofile), [onContextSelector](#oncontextselector),
     * [currentContext](#currentcontext),[products](#products),[userInfo](#userinfo),[infoIsVisible](#infoisvisible),
     * [settingsIsVisible](#settingsisvisible),[helpIsVisible](#helpisvisible)
     *
     * The following are the methods available for the Shell component:
     *
     * ### Available Methods
     *
     * * [configureProductStates](#configureproductstates), [onProductChange](#onproductchange)
     * ### Examples
     *
     * #### Example with all the options and all the icons displayed.
     *
     * ```xml
     * <ers-shell on-settings="myCtrl.displaySettingsModal()" on-info="myCtrl.displayInfoModal()" on-help="myCtrl.displayHelp()"
     *    on-edit-profile="myCtrl.onEditProfile()" on-logout="myCtrl.onLogout()" products="myCtrl.products"
     *    user-info="myCtrl.userInfo" on-context-selector="myCtrl.displayContextSelector()"
     *    on-product-change="myCtrl.onProductChange(newProduct,oldProduct)"
     *    on-after-product-change="myCtrl.onProductChange(newProduct,oldProduct)"
     *    current-context="myCtrl.currentContext" help-is-visible="myCtrl.helpIsVisible()" info-is-visible="myCtrl.infoIsVisible()"
     * settings-is-visible="myCtrl.settingIsVisible()">
     * </ers-shell>
     * ```
     *
     * #### Example with icons dynamically displayed.
     *
     *```xml
     * <ers-shell  help-is-visible="myCtrl.helpIsVisible()" info-is-visible="myCtrl.infoIsVisible()"
     * settings-is-visible="myCtrl.settingIsVisible()">
     * </ers-shell>
     * ```
     */
    class ShellComponent extends ers.components.core.BaseController {
        /**
         * the state service.
         */
        stateService: ng.ui.IStateService;
        /**
         * the onSettings callback triggered when the settings icon is clicked.
         *
         * ```xml
         * <ers-shell on-settings="myCtrl.onSettings()"/>
         * ```
         */
        onSettings: Function;
        /**
         * the onInfo callback triggered when the info icon is clicked
         *
         * ```xml
         * <ers-shell on-info="myCtrl.onInfo()"/>
         * ```
         */
        onInfo: Function;
        /**
         * the onHelp callback triggered when the help icon is clicked.
         *
         * ```xml
         * <ers-shell on-help="myCtrl.onHelp()"/>
         * ```
         */
        onHelp: Function;
        /**
         * the onLogout callback triggered when the logout link is clicked.
         *
         * ```xml
         * <ers-shell on-logout="myCtrl.onLogout()"/>
         * ```
         */
        onLogout: Function;
        /**
         * the onEditProfile callback triggered when the edit profile link is clicked.
         *
         * ```xml
         * <ers-shell on-edit-profile="myCtrl.onEditProfile()"/>
         * ```
         */
        onEditProfile: Function;
        /**
         * the onContextSelector callback triggered when the context likn is clicked.
         *
         * ```xml
         * <ers-shell on-context-selector="myCtrl.onContextSelector()"/>
         * ```
         */
        onContextSelector: Function;
        /**
         * the onProductChange callback triggered when a product is selected in the product selector
         * The callback function must respect this signature:
         *  ```typescript
         *   functionName(newProduct:IProduct,oldProduct:IProduct):ng.IPromise {
     *   }
         *   The promise could be rejected with an error message (error:string) :the product will be not changed.
         *   ```
         *   and, the attribute tag must be the same as the below example (above all the `(newProduct,OldProduct)`):
         *  ```xml
         *  <ers-shell on-product-change="myCtrl.onProductChange(newProduct,oldProduct)"></ers-shell>
         *  ```
         */
        onProductChange: Function;
        /**
         * the onAfterProductChange callback triggered after a product is selected in the product selector
         * The callback function must respect this signature:
         *  ```typescript
         *   functionName(newProduct:IProduct,oldProduct:IProduct):void {
     *   }
         *   ```
         *   and, the attribute tag must be the same as the below example (above all the `(newProduct,OldProduct)`):
         *  ```xml
         *  <ers-shell on-product-change="myCtrl.onAfterProductChange(newProduct,OldProduct)"></ers-shell>
         *  ```
         */
        onAfterProductChange: Function;
        /**
         * the current selected context.
         *
         * ```xml
         * <ers-shell current-context="myCtrl.currentContext"/>
         * ```
         */
        currentContext: string;
        /**
         * the products list for the product selector
         *
         * ```xml
         * <ers-shell products="myCtrl.products"/>
         * ```
         */
        products: IProduct[];
        /**
         * the opened products list.
         *
         */
        openedProducts: IProduct[];
        /**
         * the current selected product.
         */
        private _currentProduct;
        /**
         * the user currently logged.
         *
         * ```xml
         * <ers-shell user-info="myCtrl.userInfo"/>
         * ```
         */
        userInfo: IUserInfo;
        /**
         * the shell route state.
         */
        shellState: string;
        /**
         * the nested state corresponding to a view in a product page.
         */
        private nestedState;
        /**
         * true if settings icon is visible.
         *
         * ```xml
         * <ers-shell settings-is-visible="myCtrl.settingIsVisible()"/>
         * ```
         */
        infoIsVisible: string;
        /**
         * true if settings icon is visible.
         *
         * ```xml
         * <ers-shell settings-is-visible="myCtrl.settingIsVisible()"/>
         * ```
         */
        settingsIsVisible: string;
        /**
         * true if help icon is visible.
         *
         * ```xml
         * <ers-shell help-is-visible="myCtrl.helpIsVisible()"/>
         * ```
         */
        helpIsVisible: string;
        /**
         * the $rootScope service.
         */
        rootScope: ng.IRootScopeService;
        /**
         * the $q service.
         */
        private promiseService;
        static $inject: string[];
        /**
         * * @constructor
         * @param $scope IShellScope the scope
         * @param $state the state service.
         * @param $rootScope the $rootScope service.         */
        constructor($scope: IShellScope, $state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $q: ng.IQService);
        /**
         * test if it is the current product.
         * @param pProductToTest
         * @returns {boolean} true if the product is the current product.
         */
        isCurrentProduct(pProduct: IProduct): boolean;
        /**
         * test if a state is already configured in the stateProvider
         * @param pState the state to test
         * @returns {boolean} true if the state is configured.
         */
        private isStateAlreadyConfigured(pState);
        /**
         * When a product is selected, a new state is created to display the selected product in the view port.
         * These states could not be defined before during the configuration phase of the module, because
         * it is impossible to know by advance the products and their url.
         * @param $state the state service.
         */
        private configureProductStates($state);
        /**
         * when a product is selected : if onProductChange return a promise and if this promise is resolved, the new route
         * state is applied for this product. Otherwise, no routing and if an error exist, it is raised.
         * @param newProduct the selected product.
         * @param oldProduct the previous product.
         * @return a promise : resolved if the product is changed.
         */
        _onProductChange(newProduct: IProduct, oldProduct: IProduct): ng.IPromise<Object>;
        /**
         * call if the  _onProductChange promise is resolved
         * @param deferred ng.IDeferred
         * @param the selected product.
         * @param oldProduct the previous product.
         */
        private _onProductChangeResolved(deferred, newProduct, oldProduct);
        /**
         * get the current product.
         * @returns {IProduct}
         */
        /**
         * set the current product.
         * @param pProduct
         */
        currentProduct: IProduct;
    }
}


declare module ers.components.shell {
    import IProduct = ers.components.core.IProduct;
    import IUserInfo = ers.components.core.IUserInfo;
    /**
     * ###TopShell component
     *
     * Displays the topshell screen and its sub components (product selector, icons, menu, links).
     * The topshell is composed by a product selector and a toolbar with different links, icons and menu.
     *
     * All the links and icons are only able to trigger external actions on the click, so you have to configure
     * all the callback attributes if you want to plug these actions.
     *
     * The current context, user and product are managed by the topshell component.
     *
     * The product selection will set current product and dispatch the information with the callback
     * function [onProductChange](#onproductchange).
     *
     *  ### Available Options
     *
     * The following are the options available for the top-Shell component:
     *
     * * [onSettings](#onsettings), [onInfo](#oninfo), [onHelp](#onhelp),
     * [onLogout](#onlogout),[onEditProfile](#oneditprofile), [onContextSelector](#oncontextselector),
     * [onProductChange](#onproductchange),[onAfterProductChange](#onAfterProductChange),
     * [currentContext](#currentcontext),[products](#products),[userInfo](#userinfo),[infoIsVisible](#infoisvisible),
     * [settingsIsVisible](#settingsisvisible),[helpIsVisible](#helpisvisible)
     *
     * The following are the methods available for the top-Shell component:
     *
     * ### Available Methods
     *
     * * [changeProduct](#changeproduct), [isHelpVisible](#ishelpvisible), [isInfoVisible](#isinfovisible),
     * [isSettingsVisible](#issettingsvisible)
     *
     * ### Examples
     *
     * #### Example with all the options and all the icons displayed.
     *
     * ```xml
     * <ers-top-shell on-settings="myCtrl.onSettings()" on-info="myCtrl.onInfo()" on-help="myCtrl.onHelp()"
     * on-edit-profile="myCtrl.onEditProfile()" on-logout="myCtrl.onLogout()"
     * products="myCtrl.products"
     * on-product-change="myCtrl.onProductChange(newProduct,oldProduct)"
     * on-after-product-change="myCtrl.onProductChange(newProduct,oldProduct)"
     * user-info="myCtrl.userInfo" on-context-selector="myCtrl.onContextSelector()"
     * current-context="myCtrl.currentContext"
     * help-is-visible="myCtrl.helpIsVisible" info-is-visible="myCtrl.infoIsVisible"
     * settings-is-visible="myCtrl.settingsIsVisible"/>
     * ```
     *
     * #### Example with icons dynamically displayed.
     *
     *```xml
     * <ers-top-shell  help-is-visible="myCtrl.helpIsVisible()" info-is-visible="myCtrl.infoIsVisible()"
     * settings-is-visible="myCtrl.settingIsVisible()">
     * </ers-top-shell>
     * ```
     */
    class TopShellComponent extends ers.components.core.BaseController {
        /**
         * the onSettings callback triggered when the settings icon is clicked.
         *
         * ```xml
         * <ers-top-shell on-settings="myCtrl.onSettings()"/>
         * ```
         */
        onSettings: Function;
        /**
         * the onInfo callback triggered when the info icon is clicked
         *
         * ```xml
         * <ers-top-shell on-info="myCtrl.onInfo()"/>
         * ```
         */
        onInfo: Function;
        /**
         * the onHelp callback triggered when the help icon is clicked.
         *
         * ```xml
         * <ers-top-shell on-help="myCtrl.onHelp()"/>
         * ```
         */
        onHelp: Function;
        /**
         * the onLogout callback triggered when the logout link is clicked.
         *
         * ```xml
         * <ers-top-shell on-logout="myCtrl.onLogout()"/>
         * ```
         */
        onLogout: Function;
        /**
         * the onEditProfile callback triggered when the edit profile link is clicked.
         *
         * ```xml
         * <ers-top-shell on-edit-profile="myCtrl.onEditProfile()"/>
         * ```
         */
        onEditProfile: Function;
        /**
         * the onProductChange callback triggered when a product is selected in the product selector
         * The callback function must respect this signature:
         *  ```typescript
         *   functionName(newProduct:IProduct,oldProduct:IProduct):ng.IPromise {
         *   }
         *   The promise could be rejected with an error message (error:string) :the product will be not changed.
    
         *   ```
         *   and, the attribute tag must be the same as the below example (above all the `(newProduct,oldProduct)`):
         *  ```xml
         *  <ers-top-shell on-product-change="myCtrl.onProductChange(newProduct,oldProduct)"></ers-top-shell>
         *  ```
         */
        onProductChange: Function;
        /**
         * the onAfterProductChange callback triggered after a product is selected in the product selector
         * The callback function must respect this signature:
         *  ```typescript
         *   functionName(newProduct:IProduct,oldProduct:IProduct):void {
         *   }
         *   ```
         *   and, the attribute tag must be the same as the below example (above all the `(newProduct,OldProduct)`):
         *  ```xml
         *  <ers-top-shell on-product-change="myCtrl.onAfterProductChange(newProduct,OldProduct)"></ers-top-shell>
         *  ```
         */
        onAfterProductChange: Function;
        /**
         * the onContextSelector callback triggered when the context link is clicked.
         *
         * ```xml
         * <ers-top-shell on-context-selector="myCtrl.onContextSelector()"/>
         * ```
         */
        onContextSelector: Function;
        /**
         * the current selected context.
         *
         * ```xml
         * <ers-top-shell current-context="myCtrl.currentContext"/>
         * ```
         */
        currentContext: string;
        /**
         * the selected product index.
         */
        selectedProductIndex: number;
        /**
         * the products list for the product selector
         *
         * ```xml
         * <ers-top-shell products="myCtrl.products"/>
         * ```
         */
        products: IProduct[];
        /**
         * the current selected product.
         */
        _currentProduct: IProduct;
        /**
         * the user currently logged.
         *
         * ```xml
         * <ers-top-shell user-info="myCtrl.userInfo"/>
         * ```
         */
        userInfo: IUserInfo;
        /**
         * true if info icon is visible.
         * ```xml
         * <ers-top-shell on-info="myCtrl.onInfo()"/>
         * ```
         */
        infoIsVisible: string;
        /**
         * true if settings icon is visible.
         *
         * ```xml
         * <ers-top-shell settings-is-visible="myCtrl.settingIsVisible()"/>
         * ```
         */
        settingsIsVisible: string;
        /**
         * true if help icon is visible.
         *
         * ```xml
         * <ers-top-shell help-is-visible="myCtrl.helpIsVisible()"/>
         * ```
         */
        helpIsVisible: string;
        /**
         * the modal service.
         */
        private modalService;
        static $inject: string[];
        /**
         * * @constructor
         * @param $scope ITopShellScope the scope.
         */
        constructor($scope: ITopShellScope, ersModalService: ers.components.modal.ModalService);
        /**
         * set the selected product index and the selected product.
         * @param newProduct product to set.
         */
        private changeProduct(newProduct);
        /**
         * product getter
         * @returns {IProduct} the product
         */
        /**
         * product setter : if onProductChange exist and if its promise is resolved, the product is set, otherwise is not
         * set and an error is raised if the reject return an error message.
         * @param pProduct the product
         */
        currentProduct: IProduct;
        /**
         * help icon visibility test
         * @return {boolean} true if the help icon visible
         */
        isHelpVisible(): boolean;
        /**
         * info icon visibility test
         * @return {boolean} true if the info icon visible
         */
        isInfoVisible(): boolean;
        /**
         * settings icon visibility test
         * @return {boolean} true if the settings icon visible
         */
        isSettingsVisible(): boolean;
    }
}

declare module ers.components.tabs {
    /**
     * Provides a simple interface defining what properties a TabsController Tab is expected to include.
     */
    interface ITabScope {
        /**
         * A string that will be displayed to the user when representing this tab in the interface.
         */
        heading: string;
        /**
         * An array of strings detailing any errors with this tab. An empty array or `null` means no errors.
         */
        errors?: string[];
    }
}



/**
 * Created by FangioT on 5/15/2015.
 */
declare module ers.components.tabs {
    interface ITabsetSortEvent extends Event {
        sortOrder: number[];
    }
}


/**
 * @ngdoc directive
 * @module ers.components.tabs
 * @name ersTabset
 * @restrict E
 *
 * @description
 *
 * Use `ers-tabset` for responsive, animated tabs designed to display sheets of information.
 *
 * Sheets are the container that holds functional components. Primary Tabs are at the top of sheets and contain the
 * label for the name of the sheet. You can add secondary and tertiary level tabs within a sheet.
 *
 * `ers.components.tabs` comprises of two components:
 *
 *  - ers-tabset - Wraps the set of tabs that you wish to display (this directive).
 *  - <a href="#/components/ersTabset/documentation">ers-tab</a> - Creates a selectable tab which has a heading and
 *    content.
 *
 * <ers-tabset style="width: 300px; height: 150px; border: 1px solid #ddd; margin-left: auto; margin-right: auto;
 *                    margin-top: 25px;">
 *   <ers-tab heading="Tab 1">
 *     <ers-tabset class='secondary'>
 *       <ers-tab heading='Sub-Tab 1'>Tabs are a great use of screen space!</ers-tab>
 *       <ers-tab heading='Sub-Tab 2'>Sub-tabs can have different styling.</ers-tab>
 *     </ers-tabset>
 *   </ers-tab>
 *
 *   <ers-tab><tab-heading>Tab 2</tab-heading>Additional content. </ers-tab>
 *
 *   <ers-tab heading="Tab 3">Even more content!</ers-tab>
 * </ers-tabset>
 *
 * #### Visual Design Guidelines
 *
 * Use `ers-tab` on pages where you are designing grouped content such as forms, settings, and grids, to provide
 * a consistent level of navigation between similar modules of your application.
 *
 * ##### Styles
 *
 * There are two types of visual tabset design:
 *
 * - Primary - Used at the tops of pages to provide navigation between elements.
 * - Secondary - Used beneath Primary tabset for an additional level of navigation.
 *
 * ##### Best Practices
 *
 * Consider the following principles and best practices when designing the user interface with these components:
 *
 * - Only use one primary tabset per page to maintain proper visual hierarchy.
 * - Primary tabsets should always appear above secondary tabsets.
 * - Do not stack secondary tabsets as this may cause confusion to the user.
 * - Always place the secondary tabset inside of the primary tabset content to ensure that the tab
 *   switching animation applies to all of the content.
 *
 *
 * #### Examples
 *
 * The following example displays the code from the description display.
 *
 * ```xml
 *  <ers-tabset style="width: 300px; height: 150px; border: 1px solid #ddd; margin-left: auto; margin-right: auto;
 *                    margin-top: 25px;">
 *   <ers-tab heading="Tab 1">
 *     <ers-tabset class='secondary'>
 *       <ers-tab heading='Sub-Tab 1'>Tabs are a great use of screen space!</ers-tab>
 *       <ers-tab heading='Sub-Tab 2'>I am inside of a sub-tab, so I have different styling.</ers-tab>
 *     </ers-tabset>
 *   </ers-tab>
 *
 *   <ers-tab><tab-heading>Tab 2</tab-heading>Here is some more great content.</ers-tab>
 *
 *   <ers-tab heading="Tab 3">Even more content!</ers-tab>
 * </ers-tabset>
 * ```
 *
 *
 *
 *
 *
 * @param {boolean} [auto-activate-first-tab]
 *
 * Determines whether or not the first tab should automatically be activated upon loading of the tabs.
 * This allows the developer to choose the tab to activate when a page opens.
 *
 * @param {boolean} [can-close]
 *
 * Sets whether or not the tabs can be closed. When true, the tabs display a 'close' icon at the top right
 * of the tab during a mouse-over or hover.
 *
 * @param {boolean} [can-close-single=true]
 *
 * Sets whether or not the last tab is allowed to be closed.
 *
 *
 * **Note:** This is only relevant when `can-close` is set to `true`.
 *
 * @param {boolean} [can-sort]
 *
 * Whether or not the tab sorting is allowed. If true, the tabs can be moved to a
 * new location (within the current list of tabs).
 *
 * @param {expression} [sort]
 *
 * An Angular expression that is evaluated when a sort occurs.
 *
 * The expression may access the `$event` object which is a jQuery event with the following additional properties:
 *  - `sortOrder` - An array of indices representing the order of the tabs after the sort.
 *
 *    **For example**, if the first and second indices were swapped this may return `[0,2,1,3]`. From this, you can
 *    determine the new order of your array:
 *
 *    ```js
 *    var newTabs = _.map($event.sortOrder, function(order) {
 *      return oldTabs[order];
 *    });
 *    ```
 */
declare module ers.components.tabs {
    import IMenuItem = ers.components.contextmenu.IMenuItem;
    import IContainerEventService = ers.components.core.service.IContainerEventService;
    /**
     * @description
     *
     * Handles the events for, and styles, primary and secondary level navigation components (i.e. tabs). A Tabset must
     * contain Tabs ([[TabComponent]]) for anything to be displayed.
     *
     * The following are the most relevant methods available for the Tabset component:
     *
     * ### Relevant Methods
     *
     * * [[addTab]], [[hide]], [[layout]], [[removeTab]], [[scrollToTab]], [[selectFirstTab]], [[selectTab]], [[show]]
     *
     * ```xml
     *  <div ng-controller="MyController as ctrl">
     *    <ers-tabs>
     *      <ers-tab ng-repeat="tab in ctrl.myTabs"
     *               heading="{{tab.heading}}"
     *               errors="{{tab.errors}}"></ers-tab>
     *    </ers-tabs>
     *  </div>
     *  ```
     */
    class TabsetComponent extends ers.components.core.BaseController {
        /**
         * The amount of padding that the fade effect has.
         *
         * **Note:** This should match the fade image that is used in the CSS.
         */
        static FADE_PADDING: number;
        /**
         * Whether or not the first tab should automatically be activated upon loading of the tabs. This allows the
         * developer to activate a different tab upon opening.
         *
         * @default true
         *
         * ```xml
         * <ers-tabset auto-activate-first-tab="false">
         *   <ers-tab heading="Not Active"></ers-tab>
         *   <ers-tab heading="Active" active="true"></ers-tab>
         * </ers-tabset>
         * ```
         */
        autoActivateFirstTab: boolean;
        /**
         * Whether or not the tabs should be allowed to be closed. If true, the tabs will display a close icon at the top
         * right of the tab when hovered.
         *
         * @default false
         *
         * ```xml
         * <ers-tabset can-close="true">
         *   <ers-tab heading="I am closable"></ers-tab>
         *   <ers-tab heading="So am I"></ers-tab>
         * </ers-tabset>
         * ```
         */
        canClose: boolean;
        /**
         * Whether or not the last remaining tab is allowed to be closed.
         *
         * **Note:** Does nothing if the `canClose` is false.
         *
         * @default true
         *
         * ```xml
         * <ers-tabset can-close="true" can-close-single="false">
         *   <ers-tab heading="I am not closable since I am the only one"></ers-tab>
         * </ers-tabset>
         * ```
         */
        canCloseSingle: boolean;
        /**
         * Whether or not the tabs should be allowed to be sorted. If true, the tabs will allow the user to drag and drop
         * the tabs to a new location (within the current list of tabs).
         *
         * @default false
         *
         * ```xml
         * <ers-tabset can-sort="true">
         *   <ers-tab heading="I am sortable"></ers-tab>
         *   <ers-tab heading="So am I"></ers-tab>
         * </ers-tabset>
         * ```
         */
        canSort: boolean;
        /**
         * An Angular expression that will be called when a sort occurs.
         *
         * @default null
         */
        sort: string;
        /**
         * @private
         *
         * The delegate to which some events will be sent.
         *
         * _**Note:** This property may or may not be available in the final version of the component._
         */
        delegate: ITabsetDelegate;
        /**
         * The current list of tabs that this [[TabsetComponent]] is managing.
         *
         * _**Note:** You should never manually update this list. Instead, you should use [[addTab]] and [[removeTab]]. You
         * may, however, use this to programmatically retrieve the list of tabs._
         *
         * @readonly
         */
        tabs: TabComponent[];
        /**
         * The currently activated tab.
         *
         * @readonly
         */
        activeTab: TabComponent;
        /**
         * The list of tabs that is currently hidden to the left.
         *
         * @readonly
         */
        leftHiddenTabs: TabComponent[];
        /**
         * The list of tabs that is currently hidden to the right.
         *
         * @readonly
         */
        rightHiddenTabs: TabComponent[];
        /**
         * Dropdown menu items of hidden tabs
         *
         * @type {Array}
         */
        menuItemsOfHiddenTabs: IMenuItem[];
        /**
         * @private
         *
         * Whether or not tabs have been added/removed since the last sortable setup.
         */
        sortableTabsChanged: boolean;
        /**
         * @private
         *
         * Stores the Angular expression that is called upon a sort.
         */
        protected sortFn: Function;
        /**
         * @private
         *
         * The Angular services that this directive uses.
         */
        protected $timeout: ng.ITimeoutService;
        /**
         * @private
         *
         * Container event service.
         */
        protected containerEventService: IContainerEventService;
        /**
         * Implement the IContainerEventService protocol to listen for resize events.
         *
         * Note: This currently resizes on a 100ms delay/batch in case of multiple
         * calls.
         *
         * @param dimensions - The new dimensions of the window.
         */
        private needsLayout;
        /**
         * The ng Show directive is catched in order to compute the hidden tabs to display in the context menu accessible
         * through the bottom dropdown arrow in the top right of the tabs.
         */
        private _ngShow;
        /** Angular injection.*/
        static $inject: string[];
        /**
         * Creates a new TabsetComponent instance.
         *
         * **Note:** This method is called automatically by Angular when it sees a matching directive, so you will rarely
         * instantiate this class in your code (perhaps only in a test).
         *
         * @constructor
         *
         * @returns A new [[TabsetComponent]] instance.
         */
        constructor($scope: ng.IScope, $parse: ng.IParseService, $timeout: ng.ITimeoutService, containerEventService: IContainerEventService);
        /**
         * Getter on the ngShow directive attribute.
         * @returns {boolean} Returns the ngShow value.
         */
        /**
         * Setter on the ngShow directive attribute.
         * @param value If true, the hidden tabs will be computed again to update the hidden tabs context menu.
         */
        ngShow: boolean;
        /**
         * Called when a parent has resized the tabs.
         */
        resizeDidOccur(): void;
        /**
         * @private
         *
         * Called by Angular when the directive is being linked to an HTML element in the DOM.
         *
         * @param $scope The scope that this directive will monitor and modify.
         * @param element The jQuery representation of the HTML element.
         * @param attributes The array of HTML attributes on the element.
         */
        link($scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes): void;
        /**
         * Attempts to select the very first tab (if one is available).
         */
        selectFirstTab(): void;
        /**
         * Selects the requested tab.
         *
         * @param tab The [[TabComponent]] from the list of [[tabs]] that you wish to select.
         */
        selectTab(tab: TabComponent): void;
        /**
         * Hides this directive by setting the display to none.
         */
        hide(): void;
        /**
         * Shows this directive by setting the CSS display to  block and ensuring the layout is updated.
         */
        show(): void;
        /**
         * Gathers information about, and lays out the component in a responsive way and updates the CSS.
         *
         * Call this to refresh the layout and CSS of the component when it's container size changes or you need to ensure
         * the CSS and hidden tabs are up-to-date.
         *
         * _**Note:** You must manually run a `$digest()` cycle if calling this method outside of Angular._
         */
        layout(): void;
        /**
         * @private
         *
         * Sets up the internal jQuery UI sortable on this component.
         */
        protected setupSortable(): void;
        /**
         * Scrolls to take up any unused space so that as many tabs as possible
         * will be displayed on the screen.
         *
         * This is most useful when the component resizes and gets larger and
         * has unused space on the right side.
         *
         * This is automatically called on a window resize event, but may be
         * called by your code as well.
         */
        scrollIntoView(): void;
        /**
         * Scrolls the active tab into view with the least amount of movement possible.
         *
         * @param tab The tab from the list of [[tabs]] you wish to be scrolled into view.
         */
        scrollToTab(tab: TabComponent): void;
        private moveLeft(newPosition);
        /**
         * @private
         *
         * Synchronizes the real list of angular tab elements with our internal cache.
         */
        protected syncTabs(): void;
        /**
         * @private
         *
         * Updates the tabs that are even partially hidden off the screen.
         */
        protected updateHiddenTabs(): void;
        private updateDropdownMenu();
        /**
         * Programmatically add a tab to the end of this component's list of tabs.
         *
         * @param tab The tab to be added to the list of [[tabs]].
         */
        addTab(tab: TabComponent): void;
        /**
         * Programmatically remove a tab from this directive (no matter the position).
         *
         * _**Note:** You must manually run a `$digest()` cycle if calling this method outside of Angular._
         *
         * @param tabToRemove The tab that you wish to remove from the list of [[tabs]].
         */
        removeTab(tabToRemove: TabComponent): void;
        /**
         * @private
         *
         * Return an array of boolean values that describes whether or not the corresponding tab (by index) is hidden.
         *
         * @returns {boolean[]} Returns a list of the indexes of any hidden tabs.
         */
        protected getHiddenTabIndexes(): boolean[];
        /**
         * Returns the jQuery element used to display the tabs.
         *
         * @returns {JQuery} The jQuery element which wraps the actual HTML tab elements on the screen.
         */
        protected tabsElement(): JQuery;
    }
}


/**
 * @ngdoc directive
 * @module ers.components.tabs
 * @name ersTab
 * @restrict E
 *
 * @description
 *
 * Use the `ers-tab` within an <a href="#/components/ersTabset/documentation">ers-tabset</a> component to provide
 * the tab heading and content to the parent tabset.
 *
 * <ers-tabset style="width: 300px; height: 150px; border: 1px solid #ddd;
 *                    margin-left: auto; margin-right: auto; margin-top: 25px;">
 *   <ers-tab heading="Tab 1" errors="['Error 1', 'Error 2']">
 *     This is a tab that has errors
 *   </ers-tab>
 *
 *   <ers-tab heading="Tab 2">
 *     This tab has no errors.
 *   </ers-tab>
 * </ers-tabset>
 *
 * #### Visual Design
 *
 * `ers-tab` is used on pages containing grouped content such as forms,
 * settings, grids, and more. They provide a first level of navigation within similar modules
 * of your application.
 *
 *
 * ##### Best Practices
 *
 * Consider the following principles and
 * best practices when using tabs on your page:
 *
 * - Use one primary tabset per page to maintain proper visual hierarchy.
 * - Place primary tabsets above secondary tabsets.
 * - Do not stack secondary tabsets. The result can cause confusion.
 * - Always place the secondary tabset inside of the primary tabset content to ensure that the tab
 *   switching animation applies to them as well.
 *
 * #### Examples
 *
 * The following example displays the code used in the description:
 *
 * ```xml
 *  <ers-tabset style="width: 300px; height: 150px; border: 1px solid #ddd;
 *                    margin-left: auto; margin-right: auto; margin-top: 25px;">
 *   <ers-tab heading="Tab 1" errors="['Error 1', 'Error 2']">
 *     This is a tab that has errors
 *   </ers-tab>
 *
 *   <ers-tab heading="Tab 2">
 *     This tab has no errors.
 *   </ers-tab>
 * </ers-tabset>
 * ```
 *
 * ##### Basic Usage
 *
 * The following shows a very basic usage of a tab inside of its tabset.
 *
 * ```xml
 * <ers-tabset>
 *   <ers-tab heading="My Tab Heading"></ers-tab>
 * </ers-tabset>
 * ```
 *
 * ##### Usage with ng-repeat
 *
 * The following shows a simple example of how to use the `ers-tab` component with the `ng-repeat` directive.
 *
 * ```xml
 * <ers-tabset>
 *   <ers-tab ng-repeat="tab in MyCtrl.tabs" heading="{{tab.heading}}" errors="{{tab.errors}}"></ers-tab>
 * </ers-tabset>
 * ```
 *
 * @param {string} heading
 *
 * Sets the text to be displayed in the tab title (selection) area. Use only text, not HTML. When adding an icon in
 * HTML, *for example*, use the `tab-heading` element.
 *
 *  **Note** This attribute is marked as required because you **must** provide a heading using one of the previously
 *  mentioned for the tab to display properly.
 *
 * ##### Example - Basic Heading
 *
 * ```xml
 * <ers-tab heading="My Heading"></ers-tab>
 * ```
 *
 * ##### Example - HTML Heading
 *
 * ```xml
 * <ers-tab><tab-heading><i class='fa fa-user'></i> Users</tab-heading></ers-tab>
 * ```
 *
 * @param {boolean} [active] Whether or not this tab should be active.
 *
 * ```xml
 * <ers-tab heading="Test Active" active="myCtrl.active"></ers-tab>
 * ```
 *
 * @param {string[]} [errors]
 *
 * Sets a red dot indicating an error associated with the tab. Note that error messages are currently not viewable
 * but support may be added at a later date.
 *
 * ```xml
 * <ers-tab heading="Contact Us" errors="MyCtrl.tabs['contact-us'].errors"></ers-tab>
 * ```
 *
 * @param {expression} [select] Sets the action invoked when the tab is selected or gains focus.
 *
 * ```xml
 * <ers-tab select="MyCtrl.tabSelected()"></ers-tab>
 * ```
 *
 * @param {expression} [deselect] Sets the action invoked when the tab loses focus, or is deselected.
 *
 * ```xml
 * <ers-tab deselect="MyCtrl.tabDeselected()"></ers-tab>
 * ```
 *
 * @param {expression} [close] Sets the action invoked when this tab is closed and removed from the list
 * of tabs.
 *
 * ```xml
 * <ers-tab close="MyCtrl.tabClosed()"></ers-tab>
 * ```
 *
 */
declare module ers.components.tabs {
    import BaseController = ers.components.core.BaseController;
    /**
     * This is the controller class for the ersTab directive. It handles
     * all of the business logic for the tabs.
     */
    class TabComponent extends BaseController {
        /**
         * Whether or not this tab should be active.
         *
         * Corresponds to the tag's `active` attribute.
         */
        active: boolean;
        /**
         * Any errors that should be displayed.
         *
         * Corresponds to the tag's `errors` attribute.
         */
        errors: string[];
        /**
         * The title that should be displayed to users.
         *
         * Corresponds to the tag's `heading` attribute.
         */
        heading: string;
        /**
         * A piece of code that will be executed when this tab is selected (i.e. gains focus).
         *
         * Corresponds to the tag's `select` attribute.
         */
        select: Function;
        /**
         * A piece of code that will be executed when this tab is de-selected (i.e. loses focus).
         *
         * Corresponds to the tag's `deselect` attribute.
         */
        deselect: Function;
        /**
         * A piece of code that will be executed when this tab is closed and removed from the list of tabs.
         *
         * Corresponds to the tag's `close` attribute.
         */
        close: Function;
        /**
         * @private
         *
         * Keep a reference to our parent tabset.
         */
        tabset: TabsetComponent;
        /**
         * @private
         *
         * Any content that is transcluded by the directive.
         */
        contentElements: HTMLElement[];
        /**
         * Creates a new instance of the TabComponent.
         *
         * **Note:** This method is called automatically by Angular when it sees a matching directive, so you will rarely
         * instantiate this class in your code (perhaps only in a test).
         *
         * @param scope The scope to which this TabComponent is bound.
         */
        constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery);
        /**
         * @private
         *
         * Called by the [[linkWithTabset]] method when linking the directive.
         */
        link(scope: ng.IScope, el: ng.IAugmentedJQuery, attrs: ng.IAttributes): void;
        /**
         * @private
         *
         * Called by the Angular directive when linking this controller to the directive.
         *
         * @param scope The scope to which this controller/directive is bound.
         * @param el The DOM element to which this controller/directive is bound.
         * @param attrs The attributes that were assigned to the directive.
         * @param tabset The parent [[TabsetComponent]] instance.
         * @param transclude The Angular transclude function that will return the compiled contents of the tab.
         */
        linkWithTabset(scope: ng.IScope, el: ng.IAugmentedJQuery, attrs: ng.IAttributes, tabset: TabsetComponent, transclude: ng.ITranscludeFunction): void;
        /**
         * @private
         *
         * Extracts the transcluded contents into the heading and/or other contents.
         *
         * Once extracted, the parent tabset can append these contents to the proper
         * place.
         *
         * @param contents
         */
        extractTranscludeContents(contents: ng.IAugmentedJQuery): void;
        /**
         * @private
         *
         * Called by the directive's template when a tab is clicked/selected.
         */
        onSelect(): void;
        /**
         * @private
         *
         * Called by the directive's template when a tab is closed (using the remove icon).
         */
        onClose(): void;
        /**
         * Activates this tab and evaluates the code in the [[select]] option if provided.
         */
        activate(): void;
        /**
         * De-activates this tab and evaluates the code in the [[deselect]] option if provided.
         */
        deactivate(): void;
        /**
         * Cleans up this directive/controller when the element is being removed from the list of tabs.
         */
        destroy(): void;
        /**
         * @private
         *
         * Tests whether or not the requested DOM element is a tab heading element.
         *
         * @param node The node which we would like to test.
         *
         * @returns {string|boolean} True if the requested node is a tab heading node.
         */
        isHeadingTab(node: HTMLElement): boolean;
    }
}

/**
 * Created by fangiot on 12/14/2014.
 */
declare module ers.components.tabs {
    interface ITabsetDelegate {
        tabActivated: (tab: TabComponent) => void;
        willRemoveTab: (tab: TabComponent) => void;
        tabRemoved: (tab: TabComponent) => void;
    }
}


/**
 * Created by fangiot on 12/12/2014.
 */
declare module ers.components.tabs {
    interface ITabsetScope extends ng.IScope {
        /**
         * Whether or not the first tab should be automatically activated.
         */
        autoActivateFirstTab?: boolean;
        /**
         * The delegate object to which the TabDirective will delegate all UI and data events
         */
        delegate?: ITabsetDelegate;
        /**
         * The array of tabs which should be displayed by this directive
         */
        tabs?: ITabScope[];
    }
}

declare module ers.components.slider {
    import BaseComponent = ers.components.core.BaseComponent;
    /**
     *
     * ngdoc directive
     * @name ersSlider
     * @module ers.components.slider
     * @tag ers-slider
     * @restrict E
     *
     * @description
     *
     * Use the `ers-slider` component to creates TODO.
     *
     * The following example demonstrates a slider configured with TODO.
     *
     * <style type="text/css">
     * </style>
     *
     * <div>
     *  <ers-slider slide-from="left" max-width-size="500px"></ers-slider>
     * </div>
     *
     *
     *
     * #### Visual Design Guidelines
     *
     * When designing the size of the slider, TODO.
     *
     *
     * #### Examples
     *
     * The following example displays the code from the description display.
     *
     *
     * ```
     *
     *  <ers-slider slide-from="left" max-width-size="500px"></ers-slider>
     *
     * ```
     *
     *
     *
     * @param {attribute} slide-from Sets the side where the slider will slide.
     *  There is four available values: top, right, bottom or left (this last one is the default value if this attribute
     *  is not yet set)
     *
     * @param {expression} pinned Sets the pin state of this slider. If true, the slider will be pinned in the sheet view
     * in the place where you defined this slider. If false, regardless of the place you have defined this slider, it will
     * be placed under the sheet container at the side you have specified in the "slide-from" attribute (if not defined,
     * it will be at the left side of the sheet container), and it will be collapsed.
     * If you want to pin or unpin the slider in real time, a "pin" icon is available at the top right of the slider.
     *
     * @param {attribute} max-width-size Sets the max width size that the slider will be able to take.
     *  If the max width exceed the sheet container, it will be equals to the the size of that sheet container.
     *
     */
    class SliderComponent extends BaseComponent {
        /**
         * Authorized side from.
         * Default side from: "left".
         */
        /**
         * The min width allowed for the slider panel in pixel (px). When user minimizes the panel beyond its min size,
         * panel snaps to collapsed view.
         */
        private static SLIDER_MIN_WIDTH;
        /**
         * CSS to apply depending on the icons impacted and the side from where the slider will slide.
         */
        private static ROTATIONS_ICONS;
        /** The max width size allowed for the slider. */
        private maxWidthSize;
        /** The max height size allowed for the slider. */
        private maxHeightSize;
        /** The side on where the slider will be collapsed and from where it will be expanded. */
        private slideFrom;
        /** The max width size number value allowed for the slider. */
        private _maxWidthSizeIntValue;
        /**
         * This proxy width will be used to manipulate a "virtual" width size of the slider container in order to check
         * some constraints before applying its value as the effective width.
         */
        private _proxyWidth;
        /**
         * This width property is used to save the width value when the slider is fully collapsed in order to keep the
         * ability to expand the slider to this previous width size.
         */
        private _savedWidthState;
        /** Property used to store the button state in order to manage the dragging behaviours. (mouse down) */
        private _mouseBtnPressed;
        /** Property used to store the button state in order to manage the dragging behaviours. (mouse down and moving) */
        private _mouseIsDragging;
        /**
         * The arrow icon element of the slider bar. This property provide an easy access in order to apply rotation in this
         * icon depending on the slider state: collapsed or expanded.
         */
        private _icon;
        /**
         * The container contains: the splitter and all the content of the slider.
         * The tab and the arrow icon used for collapse/expand the slider are out of this container.
         */
        private _sliderBlockContainer;
        /** The splitter bar element with the ellipsis, the collapse arrow and the expand arrow. */
        private _splitterBar;
        /** The collapse arrow element contained in the splitter bar element. */
        private _splitterCollapseArrow;
        /** The expand arrow element contained in the splitter bar element. */
        private _splitterExpandArrow;
        /** The ellipsis element contained in the splitter bar element. */
        private _splitterEllipsis;
        /** Property used to store the 'X-coordinate- of the mouse on the mouse down/up/click event. */
        private _xRef;
        /**
         * This property is used to know if the slider is fully collapsed (property equals true) or not (equals false).
         * Initial value is true.
         */
        private _isFullyCollapsed;
        /**
         * This property is used to know if the slider is partially collapsed (property equals true)(the size of the slider
         * container is equals to the min size) or not (equals false).
         * Initial value is false.
         */
        private _isPartiallyCollapsed;
        static $inject: string[];
        /**
         * Constructor.
         * @param $element The component element.
         * @param $timeout Angular timeout service. Currently used to execute a function when the model controller is fully loaded.
         */
        constructor($element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService);
        /**
         * Initialization of the directive.
         */
        private init();
        /**
         * CSS management of the splitter ellipsis via the Javascript because it is not possible with pure CSS
         * @param eventStr Can be either "mouseover" or "mouseout".
         */
        private splitterEllipsisCSSOn(eventStr);
        /**
         * This function will be used to apply the expand behaviour on the slider component.
         */
        private applyExpandBehaviours();
        /**
         * This function will be used to apply the collapse behaviour on the slider component.
         */
        private applyCollapseBehaviours();
        /**
         * This function will be called when the user clicks on the arrow left pointing.
         */
        private mouseClickEventOnExpandArrow();
        /**
         * This function will be called when the user clicks on the arrow left pointing.
         */
        private mouseClickEventOnCollapseArrow();
        /**
         * This function will be called when the user clicks on the all tab icon.
         */
        private mouseClickEventOnTabBar();
        /**
         * This function will be called when the user put the main mouse button down on the splitter.
         * @param event Mouse down event is expected.
         */
        private mouseDownEvent(event);
        /**
         * This function will be called when the user release the main mouse button (mouse up).
         * @param event Mouse up event is expected.
         */
        private mouseUpEvent(event);
        /**
         * This function will be called when the mouse is moving from the splitter bar in order to manage the dragging behaviour.
         * @param event Mouse move event is expected.
         */
        private mouseMoveEvent(event);
        /**
         * @returns The tab icon direction depending of the "slide from" property when the slider is collapsed ready to be expand.
         */
        getTabIconExpandDirection(): string;
        /**
         * @returns The tab icon direction depending of the "slide from" property when the slider is expanded ready to be collapse.
         */
        getTabIconCollapseDirection(): string;
        /**
         * @returns The icon of the splitter ellipsis depending of the "slide from" property.
         */
        getSplitterEllipsisIcon(): string;
        /**
         * @returns The icon of the splitter collapse arrow depending of the "slide from" property.
         */
        getSplitterCollapseArrow(): string;
        /**
         * @returns The icon of the splitter expand arrow depending of the "slide from" property.
         */
        getSplitterExpandArrow(): string;
    }
}

declare module ers.components.slider {
    import BaseComponent = ers.components.core.BaseComponent;
    /**
     *
     * ngdoc directive
     * @name ersSliderContent
     * @module ers.components.slider
     * @tag ers-slider-content
     * @restrict E
     *
     * @description
     *
     * Use the `ers-slider-content component to creates TODO.
     *
     * The following example demonstrates a slider configured with TODO.
     *
     * <style type="text/css">
     * </style>
     *
     * <div>
     *  <ers-slider slide-from="left" max-width-size="500px"></ers-slider>
     * </div>
     *
     *
     *
     * #### Visual Design Guidelines
     *
     * When designing the size of the slider, TODO.
     *
     *
     * #### Examples
     *
     * The following example displays the code from the description display.
     *
     *
     * ```
     *
     *  <ers-slider slide-from="left" max-width-size="500px"></ers-slider>
     *
     * ```
     *
     *
     *
     * @param {attribute} slide-from Sets the side where the slider will slide.
     *  There is four available values: top, right, bottom or left (this last one is the default value if this attribute
     *  is not yet set)
     *
     * @param {expression} pinned Sets the pin state of this slider. If true, the slider will be pinned in the sheet view
     * in the place where you defined this slider. If false, regardless of the place you have defined this slider, it will
     * be placed under the sheet container at the side you have specified in the "slide-from" attribute (if not defined,
     * it will be at the left side of the sheet container), and it will be collapsed.
     * If you want to pin or unpin the slider in real time, a "pin" icon is available at the top right of the slider.
     *
     * @param {attribute} max-width-size Sets the max width size that the slider will be able to take.
     *  If the max width exceed the sheet container, it will be equals to the the size of that sheet container.
     *
     */
    class SliderContentComponent extends BaseComponent {
        static $inject: string[];
        /**
         * Constructor.
         * @param $element The component element.
         * @param $timeout Angular timeout service. Currently used to execute a function when the model controller is fully loaded.
         */
        constructor($element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService);
    }
}

declare module ers.components.slider {
    import BaseComponent = ers.components.core.BaseComponent;
    /**
     *
     * ngdoc directive
     * @name ersSliderHeader
     * @module ers.components.slider
     * @tag ers-slider-header
     * @restrict E
     *
     * @description
     *
     * Use the `ers-slider-header` component to creates TODO.
     *
     * The following example demonstrates a slider configured with TODO.
     *
     * <style type="text/css">
     * </style>
     *
     * <div>
     *  <ers-slider slide-from="left" max-width-size="500px"></ers-slider>
     * </div>
     *
     *
     *
     * #### Visual Design Guidelines
     *
     * When designing the size of the slider, TODO.
     *
     *
     * #### Examples
     *
     * The following example displays the code from the description display.
     *
     *
     * ```
     *
     *  <ers-slider slide-from="left" max-width-size="500px"></ers-slider>
     *
     * ```
     *
     *
     *
     * @param {attribute} slide-from Sets the side where the slider will slide.
     *  There is four available values: top, right, bottom or left (this last one is the default value if this attribute
     *  is not yet set)
     *
     * @param {expression} pinned Sets the pin state of this slider. If true, the slider will be pinned in the sheet view
     * in the place where you defined this slider. If false, regardless of the place you have defined this slider, it will
     * be placed under the sheet container at the side you have specified in the "slide-from" attribute (if not defined,
     * it will be at the left side of the sheet container), and it will be collapsed.
     * If you want to pin or unpin the slider in real time, a "pin" icon is available at the top right of the slider.
     *
     * @param {attribute} max-width-size Sets the max width size that the slider will be able to take.
     *  If the max width exceed the sheet container, it will be equals to the the size of that sheet container.
     *
     */
    class SliderHeaderComponent extends BaseComponent {
        static $inject: string[];
        /**
         * Constructor.
         * @param $element The component element.
         * @param $timeout Angular timeout service. Currently used to execute a function when the model controller is fully loaded.
         */
        constructor($element: ng.IAugmentedJQuery, $timeout: ng.ITimeoutService);
    }
}


/**
 *
 *
 * @ngdoc directive
 * @module ers.components.textbox
 * @name ersTextbox
 * @restrict E
 *
 * @description
 *
 * Use the `ers-textbox` to create an input that accepts any form of text.
 *
 * <div ng-init="demoInput='I am a text input!'" style="margin-top: 30px;">
 *   <ers-textbox name="demoInput" ng-model="demoInput"></ers-textbox>
 * </div>
 *
 * #### Visual Design
 *
 * Use `ers-textbox` anywhere the user is asked to input short text-based content such as login forms,
 * data entry, or other inputs. It should **not** be used if you are asking the user for
 * a significant amount of text input spanning multiple lines.
 *
 * #### Example
 *
 * Following is a basic example showing the most common options.
 *
 * ```xml
 * <ers-textbox name="firstName"
 *              ng-model="user.firstName"
 *              text-align="right"
 *              ng-minlength="5"
 *              ng-maxlength="30"
 *              ng-required="true">
 * </ers-textbox>
 * ```
 *
 * @param {string} name
 *
 * Sets the form name of the text box. Must be unique within the form.
 *
 * @param {string} placeholder
 *
 * Sets the ghost text that appears when the value is empty. Uses the standard HTML5 placeholder attribute.
 *
 * @param {expression} ng-model
 *
 * Sets the Angular model object which is bound to the text box's value.
 *
 * @param {string} [ng-change=""]
 *
 * Updates the output value when the textbox input value changes.
 *
 *
 * @param {boolean} [ng-disabled=false]
 *
 * Sets the disabled mode and is used in conjunction with the edit mode to prevent user entry in the specified text box.
 *
 * @param {boolean} [ng-readonly=false]
 *
 * Sets the read only option to non-editable mode.
 *
 * @param {boolean} [ng-required=false]
 *
 * Sets the text box value to mandatory, or not. The available values are true or false.
 *
 * @param {string} [ng-pattern]
 *
 * Sets a user-specified validation on the entered text. When this attribute is not used the application does not
 * check the content of the box.
 *
 * @param {boolean} [password=false]
 *
 * Sets the password constraints (prevent copy, characters are not readable) when enabled. The default value is `false`.
 *
 * @param {number} [ng-minlength]
 *
 * Sets a MIN length constraint to the text entered by the user into the text box. There is no default value.
 *
 * @param {number} [ng-maxlength]
 *
 * Sets a MAX length constraint to the text entered by the user into the text box. There is no default value.
 *
 * @param {string} [text-align]
 *
 * Sets the text box alignment value. Expected values are 'right', 'left', or 'center'. The default value is 'left'.
 *
 *
 */
declare module ers.components.textbox {
    import IValidationManager = ers.components.core.service.IValidationManager;
    import IValidationRule = ers.components.core.service.IValidationRule;
    /**
     * @tag ers-textbox
     * @restrict E
     *
     * ### Description
     *
     * You can use the <code>ers-textbox</code> directive in order to have a textbox.
     *
     */
    class TextboxComponent extends ers.components.core.InputComponent {
        /**
         * property used to create this component with the password constraints (prevent copy, characters are not readable).
         */
        private _password;
        /**
         * (Optional)
         * Attribute used to add a MIN length constraint to the value entered by the user
         * into the input.
         * Expected values: a number greater than 0.
         * Default value: none.
         */
        minLength: number;
        /**
         * (Optional)
         * Attribute used to add a MAX length constraint to the value entered by the user
         * into the input.
         * Expected values: a number greater than 0.
         * Default value: none.
         */
        maxLength: number;
        /**
         * (Optional)
         * Attribute used to supply the standard HTML5 placeholder attribute to the inner input.
         */
        placeholder: string;
        static $inject: string[];
        /**
         * Constructor.
         *
         * @param $element The component element.
         * @param $timeout Angular timeout service. Currently used to execute a function when the model controller is fully loaded.
         */
        constructor($element: ng.IAugmentedJQuery, $attrs: ng.IAttributes, $timeout: ng.ITimeoutService, vm: IValidationManager, $exceptionHandler: ng.IExceptionHandlerService);
        /**
         * Retrieves the input password constraint state.
         * @returns {boolean} Returns true if the password input constraint is enabled, false otherwise.
         */
        /**
         * Update the input password constraint state.
         * @param value The password constraint state.
         */
        password: boolean;
        /**
         * @Override super method
         */
        validationRules(): IValidationRule[];
    }
}

declare module ers.components.tooltip {
    import IPopInstance = ers.components.popover.IPopInstance;
    /**
     * Interface of a tooltip instance. Currently no difference from [[IPopInstance]]
     */
    interface ITooltip extends IPopInstance {
    }
}

declare module ers.components.tooltip {
    import IPopOptions = ers.components.popover.IPopOptions;
    interface ITooltipService {
        createTooltip(element: ng.IAugmentedJQuery, attr: ng.IAttributes, config?: IPopOptions, defaultConfig?: IPopOptions): ITooltip;
    }
}


declare module ers.components.tooltip {
    var _module: ng.IModule;
}

/**
 * Created by zhangfa on 7/3/2015.
 */
declare module ers.components.tree {
    /**
     * Interface of a tree component instance
     */
    interface ITree<T> {
        /**
         * Returns the element of the tree, in the form of a jquery object
         */
        element(): ng.IAugmentedJQuery;
        /**
         * Select an item in the tree. The selected item will be highlighted in UI and
         * can be referred by [[selectedItem]] property of the tree.
         *
         * @param item The node in tree data to be selected in UI.
         */
        selectItem(item: T): any;
        /**
         * Reverse operation of selectItem to make a selected item not selected.
         *
         * @param item The node in tree data to be selected in UI.
         */
        unselectItem(item: T): any;
        /**
         * @Readonly A reference to the selected item in tree data.
         */
        selectedItem: T;
        /**
         * @Readonly An array to reference the selected items in tree data.
         * If no item selected, will return an empty array [].
         * If multiple selection is turned off, will return an array containing the selectedItem only.
         */
        selectedItems: T[];
        /**
         * Unfold the children items of a node in the tree if it has any. Will do nothing if the node is already expanded.
         *
         * @param item The node in tree data to be expanded in UI.
         */
        expandItem(item: T): any;
        /**
         * Fold the children items of a node in the tree if it has any. Will do nothing if the node is already expanded.
         *
         * @param item The node in tree data to be collapsed in UI.
         */
        collapseItem(item: T): any;
        /**
         * Expand all the items in the tree.
         */
        expandAll(): void;
        /**
         * Collapse all the items in the tree.
         */
        collapseAll(): void;
        /**
         * Destroy the tree component.
         */
        destroy(): void;
    }
}

/**
 * Created by zhangfa on 7/1/2015.
 */
declare module ers.components.tree {
    /**
     * Internal wrapper of tree data node for UI binding.
     */
    interface ITreeItem<T> {
        /**
         * Tree data node
         */
        data: T;
        /**
         * @Optional Icon of the tree item, should be a class name of fontawesome.
         */
        icon: string;
        /**
         * Label of the tree item
         */
        label: string;
        /**
         * parent item of the tree item
         */
        parent: ITreeItem<T>;
        /**
         * Children items of the tree item
         */
        children: ITreeItem<T>[];
        /**
         * Indicate the collapsed/expanded state of the tree item. True means collapsed, false means expanded.
         */
        collapsed: boolean;
        /**
         * Indicate if the tree item is selected.
         */
        selected: boolean;
        loading: boolean;
        loaded: boolean;
        setLoader(loader: ITreeItemLoader<T>): any;
        /**
         * Lookup the given data node in the tree item itself and its children.
         * If found, return the tree item that contains the data; else return null.
         *
         * @param data
         */
        find(data: T): ITreeItem<T>;
        /**
         * Unfold the children items of the tree item
         */
        expand(e?: JQueryEventObject): ng.IPromise<void>;
        /**
         * Fold the children items of the tree item
         */
        collapse(e?: JQueryEventObject): void;
        /**
         * Set the "selected" property of the tree item and all of its children to be false
         */
        unselectAll(): void;
        /**
         * Expand tree item and all of its children
         */
        expandAll(): ng.IPromise<void[]>;
        /**
         * Collapse tree item and all of its children
         */
        collapseAll(): void;
        /**
         * Insert a record of child data at the end of children data array.
         * @param data The data to add.
         */
        addChild(data: T): void;
        /**
         * Insert a record of child data at specified position
         * @param data The data to add.
         * @param index Position of the child data to insert at
         */
        addChildAt(data: T, index: number): void;
        /**
         * Remove a record of child data
         * @param data The child data to remove
         */
        removeChild(data: T): T;
        /**
         * Remove a record of child data at specified position
         * @param index Position of the child data to remove
         */
        removeChildAt(index: number): T;
        /**
         * Remove self from parent
         */
        delete(): void;
    }
}

/**
 * Created by zhangfa on 7/6/2015.
 */
declare module ers.components.tree {
    /**
     * Interface of customization point of tree item renderer.
     *
     * Consumer can create an instance of this interface and register it as a angular service, and
     * set the name of service to the 'item-renderer' attribute of [[treeDirective]].
     *
     * #### Example
     *  * ```xml
     * <ers-tree tree-id="myTree"
     *           tree-data="ctrl.treeData"
     *           item-renderer="CheckboxTreeItemRenderer">
     * </ers-tree>
     * ```
     * and 'CheckboxTreeItemRenderer' is registered somewhere else
     *
     * ```
     *  class CheckboxTreeItemRenderer implements ITreeItemRenderer {
     *    ...
     *    public render(item:ITreeItem):JQuery {
     *      ...
     *    }
     *    ...
     *  }
     *  angular.module("...").service("CheckboxTreeItemRenderer", CheckboxTreeItemRenderer);
     *
     * ```
     */
    interface ITreeItemRenderer<T> {
        /**
         * Create an html element for the tree item, which will be appended to the tree component.
         *
         * @param item The tree item to render.
         * @Returns The jquery wrapped html element as a view of the tree item model.
         */
        render(item: ITreeItem<T>): JQuery;
    }
}

/**
 * Created by zhangfa on 7/15/2015.
 */
declare module ers.components.tree {
    /**
     * Interface of customization point for lazy loading of tree items.
     *
     * Consumer can create an instance of this interface and register it as a angular service, and
     * set the name of service to the 'item-loader' attribute of [[treeDirective]].
     *
     * #### Example
     *
     * ```xml
     *  <ers-tree tree-id="myTree"
     *            tree-data="treeData"
     *            item-loader="SampleItemLoader">
     *  </ers-tree>
     * ```
     * and 'SampleItemLoader' is registered somewhere else
     *
     * ```
     *  class SampleItemLoader implements ITreeItemLoader<ITreeNode> {
     *
     *    static $inject = ["backendService"];
     *
     *    constructor(private backendService:IBackendService) {}
     *
     *    public loadChildren(node:ITreeNode):ng.IPromise<ITreeNode> {
     *      return this.backendService.load(node.id);
     *    }
     *  }
     *
     *  angular.module("...").service("SampleItemLoader", SampleItemLoader);
     *
     * ```
     */
    interface ITreeItemLoader<T> {
        /**
         * Receives a data node of the tree and loads its children into it, and return the data node asynchronously.
         * @param data The data node whose children need to be loaded asynchronously.
         * @Returns The promise object which will pass the data node with its children loaded to the call back function.
         */
        loadChildren(data: T): ng.IPromise<T>;
    }
}

/**
 * Created by zhangfa on 7/9/2015.
 */
declare module ers.components.tree {
    /**
     * Inside scope of ers-tree directive
     */
    interface ITreeDirectiveScope<T> extends ng.IScope {
        treeData: Object[];
        root: ITreeItem<T>;
        treeId?: string;
        expandIcon?: string;
        collapseIcon?: string;
        itemRenderer?: ITreeItemRenderer<T>;
        itemLoader?: ITreeItemLoader<T>;
    }
}

declare module ers.components.tree {
    var CONSTANTS: {
        DATA_FORMAT: string;
        TREE_ITEM_MIDDLE_RANGE: number;
        DRAG_OVER_CLASS: string;
        DRAGGING_SOURCE_CLASS: string;
        DROP_EFFECT_ALLOWED: string;
        DRAG_INDICATOR_TEMPLATE: string;
    };
}

declare module ers.components.tree {
    var _module: ng.IModule;
}

/**
 * Created by ZhangFa on 6/13/2015.
 */
declare module ers.components.contextmenu {
    /**
     * A decorator to turn menu item into bindable object
     */
    class BindMenuItem implements IBindMenuItem {
        private item;
        private context;
        constructor(item: IMenuItem, context: Object);
        separatorBefore: boolean;
        enabled: boolean;
        visible: boolean;
        label: string;
        icon: string;
        onClick(e: JQueryEventObject): void;
        private _children;
        children: IBindMenuItem[];
    }
}

/**
 * Created by zhangfa on 6/11/2015.
 */
declare module ers.components.contextmenu {
    /**
     * A helper class to handle all the key board event for context menu
     */
    class KeyBoardHelper {
        private cm;
        constructor(cm: ContextMenu);
        onKeyDown(e: JQueryEventObject): void;
        private moveFocus(step);
    }
}

/**
 * Created by zhangfa on 6/8/2015.
 */
declare module ers.components.contextmenu {
    import IPlacementService = ers.components.core.service.IPlacementService;
    /**
     * Context Menu implementation
     */
    class ContextMenu implements IContextMenu {
        private static instances;
        private _host;
        private _menuItems;
        private _element;
        private _template;
        private _scope;
        private _trigger;
        private _showExclusively;
        private _container;
        private $compile;
        protected placementService: IPlacementService;
        constructor(items: IMenuItem[], template: string | ng.IPromise<string>, $compile: ng.ICompileService, ps: IPlacementService);
        private triggerEventHandler;
        bindTo(host: ng.IAugmentedJQuery): IContextMenu;
        triggeredBy(trigger: string): IContextMenu;
        showExclusively(exclusively: boolean): IContextMenu;
        appendTo(container: string | JQuery): IContextMenu;
        host(): ng.IAugmentedJQuery;
        menuItems(): IMenuItem[];
        show(x?: number, y?: number): void;
        hide(): void;
        element(): ng.IAugmentedJQuery;
        destroy(): void;
        /**
         * Override this method if the menu need be placed at
         * @param x x coordinate of mouse click point
         * @param y y coordinate of mouse click point
         */
        protected setPosition(x?: number, y?: number): void;
        /**
         * Override this method if the menu need bind to a custom context
         * @returns {T} The context the menu items bound to
         */
        protected getContext(): Object;
        private render(template);
        protected getContainer(): JQuery;
        private createScope();
        private toggleBodyClickHandler(on);
        private onBodyClick;
        private isShown();
        private clearExists();
    }
}

/**
 * Created by ZhangFa on 6/13/2015.
 */
declare module ers.components.contextmenu {
    /**
     * See [[IAnchoredContextMenu]] & [[IContextMenu]]
     */
    class AnchoredContextMenu extends ContextMenu implements IAnchoredContextMenu {
        private placement;
        withPlacement(placement: string): IAnchoredContextMenu;
        /**
         * @Override super method
         */
        protected setPosition(x?: number, y?: number): void;
        /**
         * @Override super method
         */
        protected getContext(): Object;
    }
}

/**
 * Created by zhangfa on 6/8/2015.
 */
declare module ers.components.contextmenu {
}

/**
 * Created by ZhangFa on 6/13/2015.
 */
declare module ers.components.contextmenu {
}

/**
 * Created by zhangfa on 6/8/2015.
 */
declare module ers.components.contextmenu {
}

declare module ers.components.grid.renderer {
    class EditableRenderer implements IRenderer {
        renderer(params: ICellRendererParams): HTMLElement;
    }
}

declare module ers.components.popover {
    import ITriggerEventHandler = ers.components.utility.ITriggerEventHandler;
    import ITemplateHelper = ers.components.core.service.ITemplateHelper;
    import IPlacementService = ers.components.core.service.IPlacementService;
    /**
     * Default implementation of [[IPopInstance]]
     *
     */
    class PopInstance implements IPopInstance, ITriggerEventHandler {
        private rootScopeService;
        private compileService;
        private qService;
        private timeoutService;
        private templateHelper;
        private placementService;
        private options;
        private $scope;
        private $target;
        private $host;
        private $container;
        private linker;
        private timeout;
        private hoverState;
        private triggerByClick;
        private builded;
        private isHiding;
        private isShowing;
        private isShown;
        private hoverShown;
        private hostOriginallyActive;
        constructor($host: ng.IAugmentedJQuery, options: IPopOptions, $rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $q: ng.IQService, $timeout: ng.ITimeoutService, th: ITemplateHelper, ps: IPlacementService);
        /**
         *  DOM listeners
         */
        onTrigger: () => void;
        onUntrigger: (evt?: Event) => void;
        toggle: () => void;
        private onKeyUp;
        private onFocusKeyUp;
        private onBodyClick;
        /**
         *  Public methods
         */
        host(): ng.IAugmentedJQuery;
        destroy(): void;
        show(callback?: Function): void;
        hide(callback?: Function): void;
        focus(): void;
        scope(): IPopInstanceScope;
        /**
         *  Pirvate methods
         */
        private init();
        private updateTheme();
        private updateArrow();
        private createScope();
        private build();
        private resovleTemplate();
        private resovleContainer();
        private createLinker(template);
        private clearExists();
        private applyPlacement();
        private complateHide(callback);
        private complateShow(callback);
    }
}

declare module ers.components.popover {
    import ITemplateHelper = ers.components.core.service.ITemplateHelper;
    import IPlacementService = ers.components.core.service.IPlacementService;
    /**
     * @Factory
     *
     * @param $rootScope Angular RootScope service
     * @param $compile Angular Compile service
     * @param $q Angular Q service
     * @param th TemplateHelper service
     * @returns [[IPopManager]]
     */
    function PopManagerFactory($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $q: ng.IQService, $timeout: ng.ITimeoutService, th: ITemplateHelper, ps: IPlacementService): IPopManager;
}

/**
 * Created by zhangfa on 3/16/2015.
 */
declare module ers.components.popover {
    /**
     * @ngdoc directive
     * @module ers.components.popover
     * @name ersPopover
     * @restrict E
     *
     * @description
     *
     *
     * Use the `ers-popover` to create a popover on any visible html element. A default template
     * applies a title if no template is specified.
     *
     * <div style="margin: 30px;" id="preview-popover">
     *
     *    <ers-button name="popoverTop" ers-popover
     *    po-title=""
     *    po-trigger="hover"
     *    po-placement="top"
     *    po-content="This is a popover top demo."
     *    po-id="popover #1">Left</ers-button>
     *
     *    <ers-button name="popoverRight" ers-popover
     *    po-title=""
     *    po-trigger="hover"
     *    po-placement="right"
     *    po-content="This is a popover right demo."
     *    po-id="popover #2">Right</ers-button>
     * </div>
     *
     * <!-- doesn't work.
     * <div style="margin: 30px;" id="preview-popover">
     *
     *   <button class="btn btn-default"
     *             ers-popover
     *             po-title="<b>Bonjour</b>"
     *             po-content="<b>le monde</b>"
     *             html="true">
     *             A button
     *   </button>
     *  </div>
     * //-->
     *
     * #### Example
     *
     * The following example is the code for the buttons illustrated in the description.
     *
     * ```xml
     *    <ers-button name="popoverLeft" ers-popover
     *    po-title=""
     *    po-trigger="hover"
     *    po-placement="left"
     *    po-content="This is a popover demo."
     *    po-id="popover #1">Top
     *    </ers-button>
     *
     *    <ers-button name="popoverRight" ers-popover
     *    po-title=""
     *    po-trigger="hover"
     *    po-placement="right"
     *    po-content="This is a popover demo."
     *    po-id="popover #2">Right
     *    </ers-button>
     *  ```
     *
     *
     * #### Visual Design Guidelines
     *
     * Consider the following visual design guidelines when creating your popover:
     *
     * - Keep it simple.
     * - Keep it small, never cover more than a third of the parent.
     * - Should only appear in response to a user action.
     *
     * @param {string} [po-title] Sets the title into the scope of the popover instance. Supports HTML
     * when `po-html="true"`.
     *
     * @param {string} [po-id] Sets the ID attribute which will be used for the generated DOM popover in order to have the
     * possibility to find it over the document.
     *
     * @param {string} [po-content] Sets the content into the scope of the popover instance.
     * When `html="true"`, renders an HTML string.
     *
     *
     *
     * @param {string} [po-trigger] Sets how the popover is triggered. Available values are click, focus, or hover.
     *
     * ```xml
     *     <button ers-popover
     *             po-trigger="hover">
     *          A button
     *     </button>
     * ```
     *
     * @param {string} [po-clear-exists] Sets whether or not more than one popover instance can be displayed at a time.
     *  ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-clear-exists="false">
     *             ...
     *     </button>
     * ```
     *
     *
     *
     * @param {string} [po-placement] Sets the position of popover relative to its anchor; left, right, top or bottom.
     *
     * ```xml
     *     <button ers-popover
     *             po-placement="top">
     *          A button
     *     </button>
     * ```
     *
     * @param {string} [po-target] Sets the CSS selector of an existing DOM node to the popover.
     *
     * ```xml
     * <button class="btn btn-default"
     *         ers-popover
     *         po-target="#popover1">
     * </button>
     *
     * <div id="popover1" class="popover">
     *   <h3 class="popover-title">#popover1 from after the button</h3>
     *
     *   <div class="popover-content">
     *     <p>This is a <b>HTML</b> text</p>
     *   </div>
     * </div>
     * ```
     *
     * @param {string} [po-template] Sets the popover template. The template can be the url of an HTML file or an
     * HTML string.
     *
     * ##### Example - URL
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-template="components/popover/dynamicTemplate.html">
     *             Popover by url
     *     </button>
     * ```
     *
     * ##### Example - String
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-content="<div class='popover'><h3 class='popover-title'>title</h3><div class='popover-content'>
     *             content Popover by HTML string</div></div>">
     *     </button>
     * ```
     *
     * @param {boolean} [po-html="false"] Enables the title of the tooltip to render an HTML string.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-title="Bonjour"
     *             po-content="<b>le monde</b>"
     *             html="true">
     *             A button
     *     </button>
     * ```
     *
     *
     *
     *
     *
     * @param {number} [po-show-delay] Sets the delay in milliseconds before the popover appears when triggered. The default
     * values are:
     *
     * - 500 milliseconds for Tooltip and '0' for the Popover.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-show-delay="1000">
     *             ...
     *     </button>
     * ```
     *
     * @param {number} [po-hide-delay] Sets the popover display duration in milliseconds.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-hide-delay="2000">
     *             ...
     *     </button>
     * ```
     *
     *
     * @param {string} [po-container="body"] Sets the container node to which the popover instance is appended on opening. If
     * not specified, the popover instance node is appended to HTML body. The default is body.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-container="#container">
     *             A button
     *     </button>
     *     <div id="container"/>
     * ```
     *
     * @param {boolean} [po-show-arrow="false"] Specifies if an arrow is displayed with a popover instance. This is
     * only effective when no template or target is specified.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-show-arrow="false">
     *             ...
     *     </button>
     * ```
     *
     *
     *
     * @param {boolean} [po-lazy-load="true"] Sets whether or not a popover instance is initialized immediately
     * when a page is loaded, or if initialization is delayed until the popover is called.
     *
     *  * ```xml
     *     <button class="btn btn-default"
     *             ers-popover
     *             po-lazy-load="false">
     *             ...
     *     </button>
     * ```
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     */
    function PopoverDirectiveFactory(popoverService: IPopoverService): ng.IDirective;
}

declare module ers.components.popover {
    /**
     * @Factory
     *
     * Factory to create [[IPopoverService]] instance
     *
     * @param $sce SCE service
     * @param pm PopManager instance
     * @returns [[IPopoverService]]
     */
    function PopoverServiceFactory($sce: ng.ISCEService, pm: IPopManager): IPopoverService;
}

declare module ers.components.tooltip {
    /**
     * @ngdoc directive
     * @module ers.components.tooltip
     * @name ersTooltip
     * @restrict A
     *
     * @description
     *
     * Use `ers-tooltip` component to create a tooltip to display additional information
     * about a link, button, or other chosen component.
     *
     * <div style='margin: 30px;'>
     *   <ers-button ers-tooltip tt-title="The tooltip mouseover appears on the right."
     *               tt-placement='right' tt-id="Tooltip #1">Tooltip Demonstration - Mouse Over</ers-button>
     * </div>
     *
     *
     * Consider the following usage guidelines for `ers-tooltip`:
     *
     * - **Contextualize Feedback Messages** - It is critical that a user receives contextual feedback when an action or
     * function is committed to the database. This is particularly important for web-based applications.
     *
     * - **Reduce miscommunication** - Timely and accurate feedback and validations to the user reduce user
     * mis-communication and misunderstandings.
     *
     * - **Better understand context** - Enable the user to fully understand the context of the current action and make
     * accurate and measured decisions (*for example*: error messages and validations).
     *
     *
     * #### Visual Design Guidelines
     *
     *
     * Use tooltips on action items such as icons and buttons. Consider using tooltips on any icon or button
     * that has no label or text, or where the action, or the results of the action, may be unclear.
     *
     * ##### Tooltip Length
     *
     * Tooltips should have a short and concise description of the action, potential consequences, and, if needed,
     * a link to additional information. This makes the tooltips easy for the user to quickly digest and understand.
     * Ellipses display when the message is too long.
     *
     * ##### Tooltip Placement
     *
     * Use the following guidelines to position your tooltips. When in doubt, place the tooltips so that they cover only
     * whitespace or as little content as possible.
     *
     * - **Header** - Place the tooltips below the icon or button in the header.
     *
     * - **Toolbars** - Place icons and buttons inside of a toolbar at the top of the content area and position
     *   those tooltips above the element so that it fills the whitespace above the toolbar and does
     *   not cover the content.
     *
     * - **Grid Items** - Never place tooltips below the element they describe. User must always see the content of the
     * row they are manipulating with the action.
     *
     *
     * #### Example
     *
     * The following example displays the code from the description display:
     *
     * ```xml
     * <div style='margin: 30px;'>
     *   <ers-button ers-tooltip tt-title="I appear on the right when the button is hovered."
     *               tt-placement='right' tt-id="Tooltip #1">Tooltip Demonstration - Hover Me!</ers-button>
     * </div>
     *
     * ```
     *
     *
     * @param {string} [tt-title] Sets the title to the content that appears when the tooltip is activated.
     *
     * ```xml
     *     <button ers-tooltip
     *             tt-title="This is a tooltip">
     *          A button
     *     </button>
     * ```
     *
     * @param {string} [tt-id] Sets the ID attribute which will be used for the generated DOM tooltip in order to have the
     * possibility to find it over the document.
     *
     * @param {string} [ers-tooltip] Sets the content that appears when the tooltip is activated. When `ers-tooltip` is set,
     * `tt-title` need not be set. When both ers-tooltip and tt-title are set, only the string set in ers-tooltip is
     * displayed as the tooltip.
     *
     * ```xml
     *     <button ers-tooltip="This is a tooltip">
     *          A button
     *     </button>
     * ```
     *
     * @param {string} [tt-trigger="hover"] Sets the tooltip trigger. The available values are: 'click', 'focus', and 'hover'.
     * The default is 'hover'.
     *
     * ```xml
     *     <input type="text" ers-tooltip
     *            tt-title="Tooltip triggered by focus"
     *            tt-trigger="focus" />
     * ```
     *
     * @param {string} [tt-show-delay] Sets the delay, the time waiting for the tooltip display, in milliseconds.
     * The default is 500.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             tt-show-delay="1000">
     *     </button>
     * ```
     *
     * @param {string}  [tt-hide-delay] Sets the duration of the tool tip display in milliseconds. The default is 1000 milliseconds.
     *
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             tt-hide-delay="1000">
     *             A button
     *     </button>
     * ```
     *
     *
     * @param {string}  [tt-placement] Sets the position of the  tooltip relative to the anchor.
     * The available options are 'left', 'right', 'top', and 'bottom'. The default is 'right'.
     *
     *
     * ```xml
     *    <button ers-tooltip
     *            tt-placement="top">
     *         A button
     *    </button>
     * ```
     *
     * @param {string} [tt-theme] Sets the tooltip theme. The available values are: 'info', 'success', 'danger', and 'error'.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             tt-theme="info">
     *     </button>
     * ```
     * @param {string} [po-template] Sets the tooltip template. The template can be the url of an HTML file or an
     * HTML string.
     *
     * ##### Example - URL
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             po-template="components/tooltip/dynamicTemplate.html">
     *             Tooltip by url
     *     </button>
     * ```
     *
     * ##### Example - String
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             po-content="<div class='tooltip'><h3 class='tooltip-title'>title</h3><div class='tooltip-content'>
     *             content Tooltip by HTML string</div></div>">
     *     </button>
     * ```
     *
     * @param {boolean} [tt-html="false"] Enables the title of the tooltip to render an HTML string.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             tt-title="Hello <b>World</b>"
     *             html="true">
     *             A button
     *     </button>
     * ```
     *
     * @param {string} [tt-container="#container"] Sets the container node to which the tooltip instance is
     * appended on opening. If
     * not specified, the tooltip instance node is appended to HTML body. The default is body.
     *
     * @param {string} [tt-clear-exists] Sets whether or not more than one tooltip instance can be displayed at a time.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             tt-title="Hello <b>World</b>"
     *             tt-clear-exists="false">
     *             ...
     *     </button>
     * ```
     *
     * @param {boolean} [tt-show-arrow="false"] Specifies if an arrow is displayed with a tooltip instance. This is
     * only effective when no template or target is specified.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             tt-title="Hello <b>World</b>"
     *             tt-show-arrow="false">
     *             ...
     *     </button>
     * ```
     *
     * @param {boolean} [tt-lazy-load="true"] Sets whether or not a tooltip instance is initialized immediately
     * when a page is loaded, or if initialization is delayed until the tooltip is called.
     *
     * ```xml
     *     <button class="btn btn-default"
     *             ers-tooltip
     *             tt-title="Hello <b>World</b>"
     *             tt-lazy-load="false">
     *             ...
     *     </button>
     * ```
     *
     *
     *
     *
     *
     *
     */
    function TooltipDirectiveFactory(tooltipService: ITooltipService): ng.IDirective;
}

/**
 * Created by zhangfa on 3/19/2015.
 */
declare module ers.components.tooltip {
    import IPopManager = ers.components.popover.IPopManager;
    /**
     * @Factory to create a tooltip service.
     *
     * @param $sce injected SCE service
     * @param pm injected PopManager
     * @returns [[ITooltipService]]
     */
    function TooltipServiceFactory($sce: ng.ISCEService, pm: IPopManager): ITooltipService;
}

declare module ers.components.tooltip {
}

declare module ers.components.tree {
    /**
     * @Private
     *
     * Abstract class for all drag & drop source in tree component.
     * Sub classes must override 2 abstract method:'onDragStart','onDragEnd'
     */
    class DnDSource<T> {
        protected element: ng.IAugmentedJQuery;
        protected data: T;
        bind(element: ng.IAugmentedJQuery): DnDSource<T>;
        unbind(): DnDSource<T>;
        setData(data: T): void;
        protected onDragStart: (e: JQueryEventObject) => void;
        protected onDragEnd: (e: JQueryEventObject) => void;
    }
}

declare module ers.components.tree {
    /**
     * @Private
     *
     * Abstract class for all drag & drop targets in tree component.
     * Sub classes must override these 3 abstract method:'onDragOver','onDragLeave','onDrop'
     */
    class DnDTarget<T> {
        protected element: ng.IAugmentedJQuery;
        protected data: T;
        bind(element: ng.IAugmentedJQuery): DnDTarget<T>;
        unbind(): DnDTarget<T>;
        setData(data: T): void;
        protected onDragOver: (e: JQueryEventObject) => boolean;
        protected onDragLeave: (e: JQueryEventObject) => boolean;
        protected onDrop: (e: JQueryEventObject) => boolean;
        protected middleOfTarget(target: JQuery): number;
    }
}

declare module ers.components.tree {
    /**
     * @Private
     *
     * Drag & drop source for tree item. Used to enable user to drag & drop [[ersTreeItem]] directive.
     */
    class DnDTreeItemSource extends DnDSource<ITreeItem<Object>> {
        protected onDragStart: (e: JQueryEventObject) => void;
        protected onDragEnd: (e: JQueryEventObject) => void;
    }
}

declare module ers.components.tree {
    /**
     * @Private
     *
     * Drag & drop target for [[ersTreeItem]] directive.
     * Used to enable user to drag & drop a [[DnDSource]] instance over a [[ersTreeItem]] directive.
     */
    class DnDTreeItemTarget extends DnDTarget<ITreeItem<Object>> {
        protected onDragOver: (e: JQueryEventObject) => boolean;
        protected onDragLeave: (e: JQueryEventObject) => boolean;
        protected onDrop: (e: JQueryEventObject) => boolean;
        private updateTargetData(de);
        private isInTheMiddle(e, target);
    }
}

declare module ers.components.tree {
    /**
     * @Private
     *
     * Drag & drop target for [[ersTreeItems]] directive.
     * Used to enable user to drag & drop a [[DnDSource]] instance over [[ersTreeItems]] directive.
     */
    class DnDTreeItemsTarget extends DnDTarget<ITreeItem<Object>> {
        protected onDragOver: (e: JQueryEventObject) => boolean;
        protected onDragLeave: (e: JQueryEventObject) => boolean;
        protected onDrop: (e: JQueryEventObject) => boolean;
        private getTargetTreeItem(e);
        private placeIndicator(indicator, target, e);
        private updateTargetData(de);
        private getDropIndex();
        private getIndicator();
        private removeIndicator();
        private isOverUpperHalf(mouseY, target);
        private isOverLowerHalf(mouseY, target);
    }
}

declare module ers.components.tree {
    /**
     * @Private
     * A helper class to handle all the key board event of tree component
     */
    class KeyBoardHelper {
        private tree;
        constructor(tree: ITree<Object>);
        onKeyDown: (e: JQueryEventObject) => void;
        private moveFocus(step);
        private getFocusedItem();
        private selectFocused();
        private expandFocused();
        private collapseFocused();
        private getFocused();
        private getFocusables();
    }
}

/**
 * Created by zhangfa on 7/1/2015.
 */
declare module ers.components.tree {
    interface IFieldDescriptor {
        labelField: string;
        iconField: string;
        childrenField: string;
    }
    /**
     * @Private
     * Please refer to [[ITreeItem]]
     */
    class TreeItem<T> implements ITreeItem<T> {
        static $q: ng.IQService;
        collapsed: boolean;
        selected: boolean;
        private _data;
        private _parent;
        private _children;
        private _descriptor;
        private _loaded;
        private _loading;
        constructor(data: T, descriptor: IFieldDescriptor, parent?: ITreeItem<T>);
        private _loaderDeferred;
        setLoader(loader: ITreeItemLoader<T>): void;
        loaded: boolean;
        loading: boolean;
        data: T;
        label: string;
        icon: string;
        parent: ITreeItem<T>;
        children: ITreeItem<T>[];
        isLeaf: boolean;
        expand(e?: JQueryEventObject): ng.IPromise<void>;
        private _expand;
        collapse(e?: JQueryEventObject): void;
        unselectAll(): void;
        expandAll(): ng.IPromise<void[]>;
        collapseAll(): void;
        find(data: T): ITreeItem<T>;
        addChild(data: T): void;
        addChildAt(data: T, index: number): void;
        removeChild(data: T): T;
        removeChildAt(index: number): T;
        delete(): void;
        private childrenData;
    }
}

declare module ers.components.tree {
    /**
     * @Private
     * Controller of [[treeItemsDirective]], and default implementation of [[ITree]]
     */
    class TreeController<T> implements ITree<T> {
        static $inject: string[];
        parent: TreeController<T>;
        private parentItem;
        private treeId;
        private _selectedItem;
        private _selectedItems;
        private _element;
        private multipleSelection;
        private keyBoardHelper;
        constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery);
        destroy(): void;
        element(): ng.IAugmentedJQuery;
        selectItem(item: T | ITreeItem<T>): void;
        unselectItem(item: T | ITreeItem<T>): void;
        onItemClick(item: ITreeItem<T>): any;
        selectedItem: T;
        selectedItems: T[];
        expandItem(item: T | TreeItem<T>): void;
        collapseItem(item: T | TreeItem<T>): void;
        expandAll(): void;
        collapseAll(): void;
        private unselectAll();
        private forEachItem(methodName);
        level: number;
        isRoot: boolean;
        private find(data);
        private onKeyDown;
    }
}

declare module ers.components.tree {
}

declare module ers.components.tree {
}

declare module ers.components.tree {
}

declare module ers.components.tree {
}

declare module ers.components.tree {
}

declare module ers.components.core.service {
}

/**
 * Created by ZhangFa on 5/13/2015.
 */
declare module ers.components.core.service {
}

declare module ers.components.core.service {
}

/**
 * Created by FangioT on 3/30/2015.
 */
/**
 * @ngdoc service
 * @module ers.services.resize
 * @name ResizeService
 *
 * @description
 *
 * Defines a service that allows components to resize.  `ers.services.resize` is callable by all components.
 */
declare module ers.components.core.service {
}

/**
 * Created by zhangfa on 3/13/2015.
 */
declare module ers.components.core.service {
}

/**
 * Created by zhangfa on 5/26/2015.
 */
declare module ers.components.core.service {
}
