# LDAP usando Next.JS

https://github.com/jlucaso1/next-ldap-activity

- 1. Faça um sistema que utilize os serviços de autenticação de usuários e grupos através do protocolo LDAP.
- 2. O Sistema deve ter uma área restrita ao grupo do gerentes;
- 3. O Sistema deve ter uma área restrita aos grupos de vendedores e de gerentes;
- 4. O Sistema deve ter uma área pública para qualquer usuário;
- 5. O Sistema deve ter uma tela de login contendo apenas usuário e senha;
- 6. O Sistema deve utilizar os protocolos Active Directory ou LDAP;
- 7. O Sistema deverá ser entregue dentro de um arquivo .zip contendo todos os códigos-fonte, instruções de utilização e também referências sobre códigos-fonte de terceiros;
- 8. O Sistema não poderá ter nenhuma outra base de armazenamento de dados;
- 9. O Sistema não poderá armazenar as senhas em nenhuma hipótese;
- 10. É permitido utilizar qualquer linguagem de programação;
- 11. É permitido utilizar qualquer biblioteca externa, desde que devidamente citada e com licenciamento aberto.

# Passos para execução:

### Configurar variáveis de ambiente (use como exemplo o arquivo `.env-example`)

### Rodar serviços do ldap e nextjs em modo de desenvolvimento:

```bash
docker-compose up
```

### Acesse a aplicação em http://localhost:3000

### Faça o login usando um dos usuários localizados em: `ldap-server/ldif/directory.ldif`

Exemplo: 
- username/dn: `jlucaso`
- password: `pass`

# Referências:

- https://github.com/oncase/sample-ldap
- https://next-auth.js.org/tutorials/ldap-auth-example
