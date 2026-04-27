export const metadata = {
  title: "Obchodní podmínky | Hlídací pes",
  description: "Obchodní podmínky služby Hlídací pes na webu softiq.cz.",
};

const operatorDetails = [
  "Ing. Martin Švejda",
  "IČO: 21086231",
  "Sídlo: Janského 559/13, 779 00, Olomouc – Povel",
  "E-mail: info@softiq.cz",
];

const membershipDifferences = [
  "maximálním počtem hlídacích psů",
  "dostupností historie inzerátů",
  "možnostmi detailní filtrace",
  "frekvencí reportování",
];

const complaintRequirements = [
  "jméno a kontakt",
  "přihlašovací e-mail",
  "identifikaci hlídacího psa",
  "popis závady",
  "důkazy (např. screenshoty)",
];

const subscriptionPrices = [
  "Professional – 249 Kč",
  "Premium – 89 Kč",
  "Standard – 49 Kč",
];

export default function TermsPage() {
  return (
    <main className="site-container py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          platné pro službu Hlídací pes na webu softiq.cz/hlidaci-pes od
          2.1.2025
        </p>
        <h1 className="ui-title">Obchodní podmínky</h1>
      </section>

      <div className="mt-14 max-w-3xl space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">Provozovatel</h2>
          <p className="leading-7 text-muted-foreground">
            Službu Hlídací pes provozuje:
          </p>
          <div className="border-l-2 border-primary pl-4 text-sm leading-7 text-foreground">
            {operatorDetails.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
          <p className="leading-7 text-muted-foreground">
            (dále jen „Provozovatel“).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">Popis služby</h2>
          <p className="leading-7 text-muted-foreground">
            Provozovatel poskytuje registrovaným uživatelům službu zasílání
            e-mailových upozornění na nové realitní inzeráty odpovídající jejich
            nastaveným kritériím.
          </p>
          <p className="leading-7 text-muted-foreground">
            Služba nabízí tři úrovně členství: Základní, Standardní a Prémiové.
            Úrovně se liší:
          </p>
          <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
            {membershipDifferences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="leading-7 text-muted-foreground">
            Úroveň Základní je k dispozici zdarma po omezenou dobu. Po uplynutí
            této doby musí uživatel upgradovat členství, jinak bude jeho účet
            automaticky pozastaven.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Nastavení a správa hlídacích psů
          </h2>
          <p className="leading-7 text-muted-foreground">
            V rámci služby si uživatel může nastavit hlídací psy podle zvolené
            úrovně členství. Může je kdykoliv deaktivovat ve svém účtu a své
            členství upravovat nebo zrušit. Platby za aktuálně předplacené
            členství nejsou vratné, ani poměrnou částí.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Vznik a aktivace členství
          </h2>
          <p className="leading-7 text-muted-foreground">
            Registrací na webu vzniká mezi Uživatelem a Provozovatelem smluvní
            vztah, který umožňuje bezplatné využívání služby po omezenou dobu.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">Fakturace</h2>
          <p className="leading-7 text-muted-foreground">
            Uživatel obdrží fakturu za provedenou platbu. Faktura je vystavena
            souhrnně za poslední tři platební období, na vyžádání dříve. Faktura
            je zasílána subjektům, kteří řádně vyplnili fakturační údaje.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Zrušení služby
          </h2>
          <p className="leading-7 text-muted-foreground">
            Uživatel může deaktivovat e-mailová upozornění odstraněním všech
            hlídacích psů, čímž služba zůstane aktivní. Pro úplné zrušení účtu
            je nutné kliknout na „Deaktivace účtu“. Po deaktivaci se nelze znovu
            přihlásit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Omezení služby
          </h2>
          <p className="leading-7 text-muted-foreground">
            Provozovatel nezaručuje 100% doručení všech inzerátů. Nenese
            odpovědnost za obsah a dostupnost inzerátů na externích serverech.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Odstoupení od smlouvy
          </h2>
          <p className="leading-7 text-muted-foreground">
            Uživatel může odstoupit od smlouvy do 14 dnů e-mailem. Musí uvést
            email účtu. Peníze se nevrací, pokud již byla služba využita.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-medium tracking-tight">
            Reklamační řád
          </h2>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">1. Úvodní ustanovení</h3>
            <p className="leading-7 text-muted-foreground">
              Tento řád se vztahuje na poskytování služby hlídacího psa.
              Reklamace znamená nefunkční nebo chybně poskytnutou službu.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">2. Podání reklamace</h3>
            <p className="leading-7 text-muted-foreground">
              Reklamace se podává na info@softiq.cz a musí obsahovat:
            </p>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
              {complaintRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Podmínky předplatného
          </h2>
          <p className="leading-7 text-muted-foreground">
            Předplatné se sjednává na dobu neurčitou s měsíční automatickou
            obnovou. Po provedení první platby je předplatitelovi každý měsíc
            automaticky strhávána částka odpovídající zvolenému předplatnému,
            dokud si svůj účet nezruší. Předplatitel může své předplatné kdykoli
            ukončit primárně ve svém uživatelském účtu, nebo prostřednictvím
            e-mailu na adrese info@softiq.cz. Ukončení předplatného se projeví
            od následujícího zúčtovacího období. Již uhrazené předplatné za
            aktuální období není možné vrátit. Pokud si předplatitel nepřeje
            pokračovat v předplatném, je nutné jej aktivně zrušit. V opačném
            případě bude předplatné automaticky obnovováno a platby budou dále
            strhávány.
          </p>
          <p className="leading-7 text-muted-foreground">
            Předplatné je měsíčně obnovováno automaticky:
          </p>
          <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
            {subscriptionPrices.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="leading-7 text-muted-foreground">
            Opakovaná platba probíhá automaticky bez předchozího avíza
            předplatitele, a to ve výši a periodicitě uvedené při založení
            objednávky, maximálně do konce platnosti platební karty. V případě,
            že by opakovaná platba měla být v jiné výši, než bylo uvedeno v
            objednávce, bude předplatitel o takové změně informován s předstihem
            prostřednictvím e-mailu.
          </p>
          <p className="leading-7 text-muted-foreground">
            Platební údaje jsou uloženy na straně platební brány GoPay, která s
            údaji nakládá podle mezinárodního bezpečnostního standardu PCI DSS
            Level 1 (jedná se o nejvyšší úroveň datové bezpečnosti v sektoru
            zpracovávání platebních karet).
          </p>
        </section>
      </div>
    </main>
  );
}
