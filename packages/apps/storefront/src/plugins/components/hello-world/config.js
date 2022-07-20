import { createWidgetConfig, WidgetProperty } from '@core/widgets/config';

export default createWidgetConfig([
  new WidgetProperty('message', WidgetProperty.STRING_TYPE, 'Mensagem', 'Altera o texto da mensagem', 'Hello world!')
]);
