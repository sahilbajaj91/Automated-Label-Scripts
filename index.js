dbLabel('LABEL_VALUE', 'CREATE_USER');

function dbLabel(text, createUser) {
  const data = JSON.stringify([
    {
      Text: text,
    },
  ]);

  var lang = {
    ar: 'ar_AE',
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    ja: 'ja_JP',
    ko: 'ko_KR',
    nl: 'nl_NL',
    pt: 'pt_PT',
    ru: 'ru_RU',
    th: 'th_TH',
    vi: 'vi_VN',
    'zh-CN': 'zh_CN',
    'zh-TW': 'zh_TW',
  };
  // var lang = ['en', 'ar', 'es', 'fr', 'ja', 'ko', 'th', 'vi', 'zh-CN', 'zh-TW'];
  var queryArray = [];
  for (let i in lang) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        var query =
          "INSERT INTO CUSWEB.CW_LABELS (CREATE_DATE,CREATE_USER,SEQ,LABEL_KEY,LABEL_VALUE,LOCALE,VO_SEQ,PROFILE_SEQ,CUST_SEQ)VALUES (SYSDATE,'" +
          createUser +
          "',CUSWEB.CLBL_SEQ.NEXTVAL,'" +
          text +
          "','" +
          JSON.parse(this.responseText)[0].translations[0].text +
          "','" +
          lang[i] +
          "',NULL,NULL,NULL);";
        queryArray.push(query);
      }
      if (queryArray.length > 12) {
        console.log(queryArray);
      }
    });

    xhr.open(
      'POST',
      'https://microsoft-translator-text.p.rapidapi.com/translate?to=' +
        i +
        '&api-version=3.0&profanityAction=NoAction&textType=plain'
    );
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader(
      'x-rapidapi-host',
      'microsoft-translator-text.p.rapidapi.com'
    );
    xhr.setRequestHeader(
      'x-rapidapi-key',
      'e1ecf1a20fmsh48f54e699ff313ap155603jsn73aaf8006a80'
    );

    xhr.send(data);
  }
}
