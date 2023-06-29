import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  hu: {
    translation: {
      title: 'Újratölthető pohár térkép',
      search: 'keresés',
      clear_search: 'keresés törlése',
      add_new_pt1: 'Új hely',
      add_new_pt2: 'et jelentek',
      feedback: 'Visszajelzés',
      legend: 'Jelmagyarázat',
      money_back_yes: 'visszaadják a pénzt',
      money_back_no: 'nem adják vissza',
      money_back_not_known: 'nem tudni',
      submit: 'Mehet!',
      submit_success: 'Köszönjük!',
      submit_error: 'Ez nem sikerült, kérlek, próbáld később.',
      popup: {
        system: 'Rendszer',
        'saját': 'saját',
        money_back: 'Visszaadják a pénzt?',
        igen: 'igen',
        'igen*': 'igen*',
        nem: 'nem',
        'nem*': 'nem*',
        not_known: 'nem tudni',
      },
      add_new_form: {
        title: 'Új hely jelentése',
        name: 'Hely neve',
        name_placeholder: 'Pl. Bálna',
        location: 'Hol van?',
        location_placeholder: 'Pl. Szeged, Dob utca stb.',
        system: 'Rendszer',
        system_placeholder: 'Pl. Cup Revolution',
        money_back: 'Visszaadják a pénzt?',
        money_back_placeholder: 'Pl. igen / nem / csak a Juci',
        other_info: 'Egyéb infó',
      },
      feedback_form: {
        title: 'Visszajelzés',
        text: 'Hibát találtál? Ötleted van? Vagy csak tetszik? Ide jöhet!',
      },
      filter: {
        title: 'Szűrés',
        moneyback: 'csak ahol visszaadják a pénzt',
        type_cuprevolution: 'Cup Revolution',
        type_hanaplast: 'Hanaplast',
        type_other: 'egyéb',
      },
    },
  },
  en: {
    translation: {
      title: 'Reusable cup map',
      search: 'search',
      clear_search: 'clear search',
      add_new_pt1: 'Add new',
      add_new_pt2: '',
      legend: 'Legend',
      money_back_yes: 'you get money back',
      money_back_no: 'no money back',
      money_back_not_known: 'not known',
      feedback: 'Send feedback',
      submit: 'Submit',
      submit_success: 'Thank you!',
      submit_error: 'Something went wrong — please try again later.',
      popup: {
        system: 'System',
        'saját': 'proprietary',
        money_back: 'Do you get money back?',
        igen: 'yes',
        'igen*': 'yes*',
        nem: 'no',
        'nem*': 'no*',
        not_known: 'not known',
      },
      add_new_form: {
        title: 'Submit a venue',
        name: 'Name',
        name_placeholder: 'E.g. Szimpla',
        location: 'Where is it?',
        location_placeholder: 'E.g. Szeged / Dob st / etc.',
        system: 'System',
        system_placeholder: 'E.g. Cup Revolution or "not sure"',
        money_back: 'Do they give you money back?',
        money_back_placeholder: 'yes / no / only Alice',
        other_info: 'Other info',
      },
      feedback_form: {
        title: 'Send feedback',
        text: 'Something not working? Have a suggustion? Or just a generic message? Any feedback is welcome!',
      },
      filter: {
        title: 'Filter',
        moneyback: 'only where you get money back',
        type_cuprevolution: 'Cup Revolution',
        type_hanaplast: 'Hanaplast',
        type_other: 'other',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'hu',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
