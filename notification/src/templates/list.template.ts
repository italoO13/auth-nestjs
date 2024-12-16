export default {
  1: `<!DOCTYPE html> <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <title>Bem-vindo ao Nosso Sistema</title>
          <style>
              body { font-family: Arial, sans-serif; }
              .container { width: 100%; padding: 20px; background-color: #f4f4f4; }
              .content { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; }
              .header { text-align: center; margin-bottom: 20px; }
              .footer { margin-top: 20px; text-align: center; color: #888888; font-size: 12px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="content">
                  <div class="header">
                      <h1>Bem-vindo ao Nosso Sistema!</h1>
                  </div>
                  <p>Olá,</p>
                  <p>Obrigado por se cadastrar no nosso sistema. Aqui estão suas credenciais de acesso:</p>
                  <p><strong>Usuário:</strong> {{email}}</p>
                  <p><strong>Senha:</strong> {{password}}</p>
                  <p>Por favor, troque sua senha ao fazer login pela primeira vez para garantir a segurança da sua conta.</p>
                  <p>Se você não solicitou este cadastro, por favor ignore este email.</p>
                  <p>Para sua segurança, nunca compartilhe suas credenciais de acesso com ninguém.</p>
                  <p>Se precisar de assistência, entre em contato com nosso suporte pelo email <a href="mailto:support@exemplo.com">support@exemplo.com</a>.</p>
                  <p>Atenciosamente,<br>Equipe de Suporte</p>
              </div>
              <div class="footer">
                  <p>© 2024 Nosso Sistema. Todos os direitos reservados.</p>
              </div>
          </div>
      </body>
      </html>`,
};
