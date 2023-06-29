import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header, Map } from './sections'

export const App: React.FC = () => {
  const [lang, setLang] = useState<string>()
  const { i18n } = useTranslation()

  useEffect(() => {
    const userLang = typeof localStorage !== 'undefined'
      ? localStorage.getItem('rpt_lang') ?? 'hu'
      : 'hu'

    setLang(userLang)
    i18n.changeLanguage(userLang)
    // eslint-disable-next-line
  }, [i18n.changeLanguage])

  useEffect(() => {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem('rpt_lang', i18n.language)
  }, [i18n.language])

  if (!lang) return null

  return (
    <>
      <Header />
      <main style={{ maxHeight: 'calc(100vh - 160px)' }} className="overflow-hidden">
        <Map />
      </main>
    </>
  )
}
