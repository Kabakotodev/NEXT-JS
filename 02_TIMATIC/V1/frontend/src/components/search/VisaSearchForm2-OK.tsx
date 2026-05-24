import { useState, useEffect } from "react";
import { Search, FileText, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Country {
  id: number;
  nomPays: string;
}

interface TravelDocument {
  id: number;
  nomDocument: string;
}

interface SearchResult {
  descCategorie: string;
  objetCategorie: string;
}

type Lang = "fr" | "en";

const translations = {
  fr: {
    title: "Vérifiez vos conditions d'accès",
    subtitle:
      "Sélectionnez votre pays d'origine et votre type de document pour connaître les conditions d'entrée au Sénégal.",
    country: "Pays d'émission du document",
    document: "Type de document de voyage",
    search: "Rechercher",
    searching: "Recherche en cours...",
    reset: "Nouvelle recherche",
    resultTitle: "Conditions d'entrée",
    description: "",
    noResult: "Aucun résultat trouvé.",
  },
  en: {
    title: "Check your entry conditions",
    subtitle:
      "Select your country of origin and travel document type to know entry conditions to Senegal.",
    country: "Country of document issuance",
    document: "Type of travel document",
    search: "Search",
    searching: "Searching...",
    reset: "New search",
    resultTitle: "Entry Conditions",
    description: "",
    noResult: "No result found.",
  },
};

export const VisaSearchForm = () => {
  const [lang, setLang] = useState<Lang>("fr");

  const [countries, setCountries] = useState<Country[]>([]);
  const [documents, setDocuments] = useState<TravelDocument[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [noResult, setNoResult] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [paysRes, docRes] = await Promise.all([
          fetch("http://localhost:5000/api/visa/nationalites"),
          fetch("http://localhost:5000/api/visa/documents"),
        ]);

        if (!paysRes.ok || !docRes.ok) return;

        const paysData = await paysRes.json();
        const docData = await docRes.json();

        setCountries(paysData);
        setDocuments(docData);
      } catch (err) {
        console.error("Erreur chargement données:", err);
      }
    };

    loadData();
  }, []);

  const handleSearch = async () => {
    if (!selectedCountry || !selectedDocument) return;

    setIsLoading(true);
    setHasSearched(true);
    setNoResult(false);
    setResult(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/visa/search?nationaliteId=${selectedCountry}&documentId=${selectedDocument}`
      );

      const data = await res.json();

      if (!data.found) {
        setNoResult(true);
        setIsLoading(false);
        return;
      }

      setResult({
        descCategorie: data.descCategorie,
        objetCategorie: data.objetCategorie,
      });
    } catch (err) {
      console.error("Erreur recherche:", err);
      setNoResult(true);
    }

    setIsLoading(false);
  };

  const resetSearch = () => {
    setSelectedCountry("");
    setSelectedDocument("");
    setResult(null);
    setNoResult(false);
    setHasSearched(false);
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Language Switch */}
        <div className="flex justify-end mb-4">
          <button onClick={() => setLang("fr")} className="mr-2 text-sm underline">
            FR
          </button>
          <button onClick={() => setLang("en")} className="text-sm underline">
            EN
          </button>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        {/* Form */}
        <div className="card-elevated p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">

            <div>
              <label className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4" /> {t.country}
              </label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.nomPays}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4" /> {t.document}
              </label>
              <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                <SelectTrigger>
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent>
                  {documents.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.nomDocument}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Boutons - DESIGN CONSERVÉ */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              onClick={handleSearch}
              disabled={!selectedCountry || !selectedDocument || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {t.searching}
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  {t.search}
                </>
              )}
            </Button>

            {hasSearched && (
              <Button variant="outline" size="lg" onClick={resetSearch}>
                {t.reset}
              </Button>
            )}
          </div>
        </div>

        {/* NO RESULT */}
        {noResult && (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded">
            {t.noResult}
          </div>
        )}

       
        {/* Résultat */}
        {result && (
          <div className="mt-8 animate-fade-up">
            <div className="card-elevated p-6 lg:p-8 border-l-4 border-l-primary">

              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                {t.resultTitle}
              </h3>

              <div className="space-y-6">

                {/* Description */}
                <div className="bg-muted/50 rounded-lg p-5">
                  <p className="text-sm text-muted-foreground mb-2">
                    {t.description}
                  </p>
                  <p className="font-semibold text-foreground text-base leading-relaxed">
                    {result.descCategorie}
                  </p>
                </div>

                {/* Détails */}
                <div className="bg-secondary/10 rounded-lg p-5 border border-secondary/20">
                  <p className="font-semibold text-foreground mb-3">
                    {lang === "fr" ? "Explications :" : "Explications:"}
                  </p>

                  <div
                    className="text-muted-foreground leading-relaxed space-y-2"
                    dangerouslySetInnerHTML={{
                      __html: result.objetCategorie,
                    }}
                  />
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default VisaSearchForm;