import { createWidgetConfig, WidgetProperty } from '@core/widgets/config';

export default createWidgetConfig([
  new WidgetProperty(
    'src',
    WidgetProperty.WEB_CONTENT_TYPE,
    'Resource',
    'Altera o conteúdo do HTML',
    '<p class="px-4 py-2 text-lg text-blue-500 bg-blue-50">Any <strong>paragraph</strong> of text</p>'
  )
]);
