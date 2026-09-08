import Script from "next/script";
import { analytics } from "@/lib/analytics";

/**
 * Счётчики Яндекс.Метрики и Google Analytics.
 *
 * Оба грузятся стратегией lazyOnload — в простое браузера, после того как
 * страница полностью загружена. Замеры показали, что счётчики добавляют
 * около 240 КБ; на критическом пути это заметно било бы по скорости,
 * которую поисковики учитывают при ранжировании.
 *
 * Плата за это — посетители, ушедшие за первые пару секунд, могут не
 * попасть в статистику. Для сайта с невысоким трафиком такой перекос
 * приемлемее, чем замедление показа страницы.
 *
 * webvisor записывает сессии посетителей: для сайта, где вся конверсия —
 * это клик в WhatsApp, записи показывают, на чём посетители останавливаются.
 * Отключается заменой true на false ниже.
 *
 * Если идентификатор не задан, соответствующий блок не выводится вовсе.
 */
export function Analytics() {
  const { yandexMetrica, googleAnalytics } = analytics;

  if (!yandexMetrica && !googleAnalytics) return null;

  return (
    <>
      {yandexMetrica ? (
        <>
          <Script id="ym-init" strategy="lazyOnload">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${yandexMetrica}, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });`}
          </Script>
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${yandexMetrica}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      ) : null}

      {googleAnalytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
            strategy="lazyOnload"
          />
          <Script id="ga-init" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalytics}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
