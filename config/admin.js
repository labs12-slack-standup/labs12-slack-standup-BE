const admin = require("firebase-admin");

// module.exports = admin.initializeApp({
//   credential: admin.credential.cert({
//     type: "service_account",
//     project_id: process.env.PROJECT_ID,
//     private_key_id: process.env.PRIVATE_KEY_ID,
//     private_key: process.env.PRIVATE_KEY,
//     client_email: process.env.CLIENT_EMAIL,
//     client_id: process.env.CLIENT_ID,
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: process.env.CLIENT_URL
//   })
// });

module.exports = admin.initializeApp({
  credential: admin.credential.cert(
    {
      "type": "service_account",
      "project_id": "slack-standup-1556221821574",
      "private_key_id": "f0b1d72f2535dc3c8b2cd102e0476cfcbcc95008",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJEQ7oXyqbF2eS\n/O94wPRcGBb08fWrZ4igMZ5Ry14nBUiGqw68Pc1znULxP+VPw93z3NXa2j1TrECF\nw2YUOpdajcsO/vlXRS9xsHqWQ5c2k6G8SCbdIys+u1EVRhyepodBTECM+HCHKkzv\n1c1QCuTXbQN8PtOLZvk3ro4Sa0LaIKRJrsEJyOBBd+aESGkNJw2mcFpvJKuAwTzN\nUkj3EOiuz1Fc710QAdmc35+u60OnER94eTcdvWRcpyq9gFyHqXnj09nNdEs++xC0\nk35wgoAdVIETvlW13QeTZHu5u7SPSht4jjMzCGA0myYnfRPbIYqIT1VBEqcNXh96\nRW7sO4GFAgMBAAECggEADF3E97RAs9S67U6qsNfXP6HIqayHAlGGFOowVVIHeqln\nxkaXi6rWa8WwlBNsuFzw1fqPWZxCGNcXidKUgOqAnBRr+IJklgI+koS66WqDTptC\nX4jlgQTUeFF/gWo0QOq3l2PH9ZOjIiEPJdIVxFZDMF+3TukzTBfbfJn7CXV44V70\nF8ZmRricodezqTNlQNlUYRAQBeYlnCTKR3BoB2r9N8zt4YqcgjXoSvr5ZmziA+FU\nbkdWsfu0yYuHhl2yqZRZOYPiHQ9q7ClwMQSM9LjcXS3xARQWxSfi8+L0XIbDPOaq\nmweYJ5T8kR936q2Kulag9FejuXtvTcZqP3tXC2Qs+QKBgQD0UQBPLMALnnpWXC67\nPILIEX76MsDsMEyRj+PgosKXN7cdYI4jZFI9kuQeobl3XXQyf+dc9Bo+dt6/VzFP\nbfGhhxII1NxDOPLfcnmJph4/JrdsBlTpb3ctwhJObHYYDzS3dLfFdF+9qJl7XC4n\nmhdYrj3o/dFUEVNjFMssq/jRrQKBgQDSrpRetPtHuQ4z9asboI7allP04zlmeYGt\nhxfX0cnCtENM1jGeuqoJQSxN+oUdApnPSci+b2lFitBetDUrF5b9gm2383acADrB\n0FISDVxLH2aHpGezrayERA+Vw5YgoEpDiDsliV0H11hXodJl7y6p5BCwMlnWYIT+\nnSv6mFZaOQKBgBsuI8WrKdZhFCUlbkGAUuBlKeY13UapfOs4wdZM5S8jkKihBE8l\nqwyUmfJadaK07+dqWVf7BCxs1w0cayz2A0rAFx6KZ9LGtCZtut24cGcALKnE7o9l\nyjF6BMVaxayZjHjYcFV0Q+56olCaCbx4JR7Fi7eu/SnIH6nHN29J1o2lAoGBAJBi\nmMg3HCbRSkyNxtBOPtjLQYqI1uPFzfuQo+SCn9VSGPVlrefsYW+qPKTMVcHF8IdB\nN9RbIjhIo/jjY7S+m/ntEyiIL/dFqP7+t+ArS98oC+pV38Qh+CNFSbEHs7F0aLDT\ngkV9WEZxbNfRzRGS09YWuOEoAK2MxFiCeotpL3TxAoGBAM79PDxXhU5gd+7myGRl\n3dhnF8wF5tFJB0JSkcBbhJS1ywCbBtplAvgI6VIxfcH4axZPT4AOJkdsn2wOMHU1\nUYx7C4k5cu//Sv1+Jsc7SOiDeHJs3kJBpNzxdsPQrrbSwepL6bc809Pg3DzLUAaI\n3/UBAAOPNLMJIvQijqdVWyC6\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-2r8nu@slack-standup-1556221821574.iam.gserviceaccount.com",
      "client_id": "112248934069062994869",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2r8nu%40slack-standup-1556221821574.iam.gserviceaccount.com"
    })
});
