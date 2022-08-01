/**
 * Representation of Widget Property.
 */
export class WidgetProperty {
  /**
   * String Type.
   */
  static STRING_TYPE = 'stringType';

  /**
   * Number Type.
   */
  static NUMBER_TYPE = 'numberType';

  /**
   * Boolean Type.
   */
  static BOOLEAN_TYPE = 'booleanType';

  /**
   * Media Type.
   */
  static MEDIA_TYPE = 'mediaType';

  /**
   * Web Content Type.
   */
  static WEB_CONTENT_TYPE = 'webContentType';

  /**
   * Strategy Type.
   */
  static STRATEGY_TYPE = 'strategyType';

  /**
   * Constructor of Widget Property.
   * @param {string} id
   * @param {('stringType'|'numberType'|'booleanType'|'mediaType'|'webContentType'|'strategyType')} type
   * @param {string} label
   * @param {string} description
   * @param {*} defaultValue
   * @param {boolean} required
   */
  constructor(id, type, label, description, defaultValue, required = false) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.description = description;
    this.defaultValue = defaultValue;
    this.required = required;
  }

  /**
   * Gets a real type.
   * @returns {string} Real type.
   */
  getType() {
    if (this.type === WidgetProperty.NUMBER_TYPE) {
      return WidgetProperty.STRING_TYPE;
    }
    if (this.type === WidgetProperty.STRATEGY_TYPE) {
      return 'select2Type';
    }

    return this.type;
  }

  /**
   * Gets the regular expression pattern.
   * @returns {string} Regular expression pattern.
   */
  getPattern() {
    if (this.type === WidgetProperty.NUMBER_TYPE) {
      return '[0-9]+';
    }

    return undefined;
  }

  /**
   * Gets the data key.
   * @returns {string} Data key.
   */
  getDataKey() {
    if (this.type === WidgetProperty.STRATEGY_TYPE) {
      return 'strategies';
    }

    return undefined;
  }

  /**
   * Gets the definition settings of this property.
   * @returns {Object} Definition settings.
   */
  getDefinitionSettings() {
    return {
      id: this.id,
      type: this.getType(),
      defaultValue: this.defaultValue,
      required: this.required,
      pattern: this.getPattern(),
      dataKey: this.getDataKey(),
      labelResourceId: `${this.id}Label`,
      helpTextResourceId: `${this.id}HelpText`
    };
  }

  /**
   * Gets the locale resources of this property.
   * @returns {Object} Locale resources.
   */
  getLocaleResources() {
    return {
      [`${this.id}Label`]: this.label,
      [`${this.id}HelpText`]: this.description
    };
  }
}

/**
 * Create widget configuration from properties.
 * @param {Array<WidgetProperty>} properties
 * @returns {Object} Widget configuration.
 */
export function createWidgetConfig(properties) {
  const settings = {
    properties: [],
    resources: {}
  };

  properties.forEach(property => {
    settings.properties.push(property.getDefinitionSettings());
    settings.resources = { ...settings.resources, ...property.getLocaleResources() };
  });

  const { resources } = settings;

  return {
    properties: settings.properties,
    locales: {
      'pt-BR': { resources },
      en: { resources }
    }
  };
}
