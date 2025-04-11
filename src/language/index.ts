import { createI18n } from "vue-i18n";

const i18n = createI18n({
    locale: 'ja',//当前语言
    fallbackLocale: 'en', //备用语言
    messages: {
      en: {
        message: {
          hello: 'hello world'
        }
      },
      ja: {
        message: {
          hello: 'こんにちは、世界'
        }
      }
    }
})

  export const setupLanguage=(app)=>{
    app?.use(i18n)
  }
  export const updateLanguage = (languageToken) => {
    i18n.global.locale = languageToken; // 或根据需要切换语言
 };