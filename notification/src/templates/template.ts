import listTemplates from './list.template';

export class GetTemplates {
  static renderTemplate(n: number, variables: Record<string, string>) {
    let template = listTemplates[n];
    for (const [key, value] of Object.entries(variables)) {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return template;
  }
}
