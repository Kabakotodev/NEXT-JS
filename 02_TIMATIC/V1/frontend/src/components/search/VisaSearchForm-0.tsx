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

export const VisaSearchForm = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [documents, setDocuments] = useState<TravelDocument[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedDocument, setSelectedDocument] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // 🔹 Chargement des pays et documents
  useEffect(() => {
    const loadData = async () => {
      try {
        const [paysRes, docRes] = await Promise.all([
          fetch("http://localhost:5000/api/visa/nationalites"),
          fetch("http://localhost:5000/api/visa/documents"),
        ]);

        const paysData = await paysRes.json();
        const docData = await docRes.json();

        setCountries(paysData);
        setDocuments(docData);
      } catch (error) {
        console.error("Erreur chargement données :", error);
      }
    };

    loadData();
  }, []);

  // 🔹 Recherche
  const handleSearch = async () => {
    if (!selectedCountry || !selectedDocument) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/visa/search?nationaliteId=${selectedCountry}&documentId=${selectedDocument}`
      );

      if (!res.ok) {
        setResult(null);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Erreur recherche :", error);
    }

    setIsLoading(false);
  };

  // 🔹 Reset
  const resetSearch = () => {
    setSelectedCountry("");
    setSelectedDocument("");
    setResult(null);
    setHasSearched(false);
  };

  return (
    <section id="recherche" className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Vérifiez vos conditions d'accès
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sélectionnez votre pays d'origine et votre type de document
              pour connaître les conditions d'entrée au Sénégal.
            </p>
          </div>

          {/* Form */}
          <div className="card-elevated p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Pays */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  Pays d'émission du document
                </label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Sélectionnez votre pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={String(country.id)}>
                        {country.nomPays}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Document */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Type de document de voyage
                </label>
                <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Sélectionnez le type de document" />
                  </SelectTrigger>
                  <SelectContent>
                    {documents.map((doc) => (
                      <SelectItem key={doc.id} value={String(doc.id)}>
                        {doc.nomDocument}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Boutons */}
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
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Recherche en cours...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Rechercher
                  </>
                )}
              </Button>

              {hasSearched && (
                <Button variant="outline" size="lg" onClick={resetSearch}>
                  Nouvelle recherche
                </Button>
              )}
            </div>
          </div>

          {/* Résultat */}
          {result && (
            <div className="mt-8 animate-fade-up">
              <div className="card-elevated p-6 lg:p-8 border-l-4 border-l-primary">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Conditions d'entrée
                </h3>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Description
                    </p>
                    <p className="font-semibold text-foreground">
                      {result.descCategorie}
                    </p>
                  </div>

                  <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20">
                    <p className="font-semibold mb-2">Détails :</p>
                    <div
                      className="text-muted-foreground"
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
      </div>
    </section>
  );
};

export default VisaSearchForm;