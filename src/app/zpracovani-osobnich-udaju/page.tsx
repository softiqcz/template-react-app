export const metadata = {
  title: "Zpracování osobních údajů | Hlídací pes",
  description: "Informace o zpracování osobních údajů pro službu Hlídací pes.",
};

const legalBases = [
  "Primárně pro účely splnění smlouvy – splnění služby, kterou si přejete poskytnout, nebo pro provedení opatření přijatých před uzavřením smlouvy na žádost klienta.",
  "Je-li to nezbytné pro splnění právní povinnosti správce.",
  "Pro ochranu práv a právem chráněných zájmů správce.",
  "Na základě Vašeho souhlasu.",
];

const deletionReasons = [
  "již nejsou potřebné pro účely, pro které byly shromážděny nebo jinak zpracovány;",
  "klient odvolá souhlas a neexistuje žádný další důvod pro zpracování;",
  "klient vznese námitky proti zpracování a neexistují žádné převažující oprávněné důvody pro zpracování.",
];

const rights = [
  {
    title: "Právo na přístup k osobním údajům",
    text: "Klient má právo získat od správce potvrzení o tom, zda zpracovává osobní údaje klienta, a pokud ano, má právo na přístup k těmto osobním údajům a informacím o tom, jakým způsobem jsou osobní údaje zpracovávány.",
  },
  {
    title: "Právo na opravu osobních údajů",
    text: "Klient má právo na to, aby správce bez zbytečného odkladu opravil osobní údaje, které se klienta týkají, a aby na základě prohlášení klienta doplnil údaje neúplné.",
  },
  {
    title: "Právo na omezení zpracování",
    text: "Klient má právo, aby správce omezil zpracování osobních údajů, nejsou-li dořešeny sporné otázky.",
  },
  {
    title: "Právo na přenositelnost údajů",
    text: "Klient má právo získat osobní údaje, které poskytl správci na základě souhlasu nebo pro účely plnění smlouvy, ve strukturovaném formátu.",
  },
  {
    title: "Právo vznést námitku",
    text: "Klient má právo vznést námitku proti zpracování osobních údajů na základě oprávněného zájmu správce.",
  },
];

function ProcessingPurposeSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-medium tracking-tight">Účely zpracování</h2>
      <p className="leading-7 text-muted-foreground">
        Vaše osobní údaje jsou zpracovány zejména za účelem plnění objednané
        služby. Správce dále zpracovává osobní údaje klienta za účelem vedení
        účetní a daňové agendy, plnění zákonných povinností správce dle
        příslušných daňových a účetních předpisů. Správce je případně oprávněn
        zpracovávat osobní údaje klienta za účelem určení, výkonu či obhajoby
        svých právních nároků včetně vymáhání pohledávek za klientem. Vaše
        osobní údaje mohou být zpracovány též z důvodu zdokonalení služby,
        případně i pro nabídku dalších služeb.
      </p>
    </section>
  );
}

export default function PersonalDataProcessingPage() {
  return (
    <main className="site-container py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          platné pro službu Hlídací pes na webu softiq.cz/hlidaci-pes od
          2.1.2025
        </p>
        <h1 className="ui-title">Zpracování osobních údajů</h1>
      </section>

      <div className="mt-14 max-w-3xl space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Kdo zpracovává Vaše osobní údaje?
          </h2>
          <p className="leading-7 text-muted-foreground">
            Osobní údaje sami zadáváte na webové stránky www.softiq.cz.
            Provozovatelem webu je Ing. Martin Švejda, IČO 21086231, sídlem
            Janského 559/13, 779 00, Olomouc – Povel (dále jen „správce“), který
            je zároveň správcem osobních údajů klientů ve smyslu čl. 7 nařízení
            Evropského parlamentu a Rady č. 2016/679 (obecné nařízení o ochraně
            osobních údajů, dále jen „nařízení“).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Jaké osobní údaje jsou zpracovávány?
          </h2>
          <p className="leading-7 text-muted-foreground">
            Abychom Vám mohli poskytnout Vámi požadovanou službu, potřebujeme
            znát alespoň Váš e-mail, na němž Vás můžeme kontaktovat. Údaje
            poskytujete výlučně Vy vyplněním příslušného formuláře na webu.
            Údaje z jiných zdrojů nejsou získávány. Dále zpracováváme adresu,
            ič, název subjektu, pokud tyto informace klient poskytne.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Právní základ zpracování
          </h2>
          <p className="leading-7 text-muted-foreground">
            Správce je oprávněn zpracovávat Vaše osobní údaje pouze pro účely,
            pro něž má příslušný právní základ pro zpracování. Vzhledem k
            činnosti, které správce provozuje, a účelům, pro které správce
            osobní údaje klientů zpracovává, správce zpracovává osobní údaje na
            těchto právních základech:
          </p>
          <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
            {legalBases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <ProcessingPurposeSection />
        <ProcessingPurposeSection />

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Příjemci osobních údajů
          </h2>
          <p className="leading-7 text-muted-foreground">
            Správce neposkytuje osobní údaje jiným subjektům.
          </p>
          <p className="leading-7 text-muted-foreground">
            Správce nepředává osobní údaje do třetí země ani mezinárodní
            organizaci.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-medium tracking-tight">
            Jaká máte v souvislosti se zpracováním osobních údajů práva?
          </h2>
          {rights.slice(0, 2).map((right) => (
            <p key={right.title} className="leading-7 text-muted-foreground">
              <span className="font-medium text-foreground">
                {right.title}:
              </span>{" "}
              {right.text}
            </p>
          ))}
          <div className="space-y-4">
            <p className="leading-7 text-muted-foreground">
              <span className="font-medium text-foreground">
                Právo na výmaz osobních údajů:
              </span>{" "}
              Klient má právo na to, aby správce bez zbytečného odkladu vymazal
              osobní údaje, které se klienta týkají, pokud:
            </p>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
              {deletionReasons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {rights.slice(2).map((right) => (
            <p key={right.title} className="leading-7 text-muted-foreground">
              <span className="font-medium text-foreground">
                {right.title}:
              </span>{" "}
              {right.text}
            </p>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Dobrovolnost poskytnutí osobních údajů
          </h2>
          <p className="leading-7 text-muted-foreground">
            Poskytnutí osobních údajů je vždy dobrovolné. V případě, že klient
            osobní údaje neposkytne pro účely zpracování, nebude možné, aby
            správce poskytl klientovi relevantní služby.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight">
            Jak dlouho jsou osobní údaje zpracovávány?
          </h2>
          <p className="leading-7 text-muted-foreground">
            Osobní údaje vztahující se k uzavření smlouvy a plnění smlouvy
            správce zpracovává po dobu trvání smlouvy – poskytování služby, a
            dále pak po dobu nezbytně nutnou pro případ, že by správce musel
            předkládat důkazy v soudním nebo správním řízení.
          </p>
        </section>
      </div>
    </main>
  );
}
