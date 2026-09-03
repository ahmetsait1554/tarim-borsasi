import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Clock3,
  Leaf,
  MapPin,
  RefreshCw,
  AlertCircle,
  Loader2,
} from 'lucide-react';

type Trend = 'up' | 'down';

type Price = {
  product: string;
  price: string;
  unit: string;
  change: string;
  trend: Trend;
  low: string;
  high: string;
  market: string;
  category: string;
};

type LoadState = 'loading' | 'success' | 'error';

const regions = ['Tümü', 'Konya', 'Adana', 'Polatlı', 'Ulusal Süt Konseyi'];

function App() {
  const [selectedRegion, setSelectedRegion] = useState('Tümü');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prices, setPrices] = useState<Price[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  const parsePrices = (data: unknown): Price[] => {
    if (Array.isArray(data)) {
      return data as Price[];
    }

    if (typeof data !== 'string') {
      throw new Error('Beklenmeyen veri biçimi');
    }

    const arrayMatch = data.match(/const prices(?:: Price\[\])?\s*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) {
      throw new Error('Kaynak dosyada fiyat listesi bulunamadı');
    }

    const items = [...arrayMatch[1].matchAll(/\{([\s\S]*?)\}/g)].map((match) => {
      const item = match[1];
      const readValue = (key: string): string => {
        const valueMatch = item.match(new RegExp(`${key}\\s*:\\s*['\"]([^'\"]*)['\"]`));
        if (!valueMatch) {
          throw new Error(`Eksik fiyat alanı: ${key}`);
        }
        return valueMatch[1];
      };

      const trend = readValue('trend') as Trend;
      if (trend !== 'up' && trend !== 'down') {
        throw new Error('Geçersiz fiyat değişim yönü');
      }

      return {
        product: readValue('product'),
        price: readValue('price'),
        unit: readValue('unit'),
        change: readValue('change'),
        trend,
        low: readValue('low'),
        high: readValue('high'),
        market: readValue('market'),
        category: readValue('category'),
      };
    });

    if (items.length === 0) {
      throw new Error('Kaynak dosyada fiyat bulunamadı');
    }
    return items;
  };

  const GITHUB_URL =
    'https://raw.githubusercontent.com/ahmetsait1554/tarim-borsasi/refs/heads/main/public/prices.json';

  const fetchPrices = async (silent = false) => {
    if (!silent) setLoadState('loading');
    try {
      const res = await fetch(GITHUB_URL, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Sunucu hatası: ${res.status}`);
      }
      const responseText = await res.text();
      let data: unknown = responseText;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = responseText;
      }
      setPrices(parsePrices(data));
      setCurrentTime(new Date());
      setLoadState('success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setErrorMsg(message);
      if (!silent) setLoadState('error');
    }
  };

  useEffect(() => {
    void fetchPrices();
    const timer = window.setInterval(() => void fetchPrices(true), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const visiblePrices = useMemo(
    () =>
      selectedRegion === 'Tümü'
        ? prices
        : prices.filter((price) => price.market === selectedRegion),
    [selectedRegion, prices],
  );

  const formattedTime = currentTime.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-[#eef0f0] text-[#17211e]">
      <header className="sticky top-0 z-20 border-b border-[#d8dddb] bg-[#f8f9f8]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-7 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#176b45] text-white shadow-[0_5px_15px_rgba(23,107,69,0.2)] sm:h-11 sm:w-11">
              <Leaf size={22} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold uppercase tracking-[0.18em] text-[#547066]">
                Piyasa takip ekranı
              </p>
              <h1 className="truncate text-[19px] font-extrabold tracking-[-0.04em] sm:text-[25px]">
                GÜNCEL TARIM BORSASI
              </h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-[#dce2df] bg-white px-3 py-2 text-xs font-semibold text-[#53625d] shadow-sm sm:flex">
              <Clock3 size={14} className="text-[#176b45]" />
              Son Güncelleme: {formattedTime}
            </div>
            <button
              type="button"
              onClick={() => void fetchPrices()}
              disabled={loadState === 'loading'}
              aria-label="Fiyatları yenile"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#dce2df] bg-white text-[#176b45] shadow-sm transition-all hover:bg-[#e7f4ed] disabled:opacity-50 sm:h-10 sm:w-10"
            >
              <RefreshCw size={16} className={loadState === 'loading' ? 'animate-spin' : ''} />
            </button>
            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#e7f4ed] px-2.5 py-2 text-[11px] font-bold text-[#176b45] sm:hidden">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#21a665]" />
              CANLI
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-12 pt-6 sm:px-7 sm:pt-8">
        <section className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#176b45]">
              <Activity size={15} strokeWidth={2.5} /> Günlük fiyat özeti
            </div>
            <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.045em] sm:text-[34px]">
              Bugünün piyasa fiyatları
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[#697772]">
              Seçtiğiniz bölgedeki güncel ortalama fiyatları ve günlük değişimleri takip edin.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-lg border border-[#d8dddb] bg-white px-3 py-2 text-xs font-semibold text-[#61706b] shadow-sm sm:self-end">
            <MapPin size={14} className="text-[#176b45]" />{' '}
            {selectedRegion === 'Tümü' ? 'Tüm piyasalar' : selectedRegion}
          </div>
        </section>

        <nav
          aria-label="Pazar seçimi"
          className="mb-6 -mx-4 overflow-x-auto px-4 pb-1 sm:-mx-0 sm:px-0"
        >
          <div className="flex min-w-max gap-2">
            {regions.map((region) => {
              const active = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                    active
                      ? 'border-[#176b45] bg-[#176b45] text-white shadow-[0_4px_12px_rgba(23,107,69,0.18)]'
                      : 'border-[#d6dcda] bg-white text-[#53625d] hover:border-[#83aa95] hover:text-[#176b45]'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#52615c]">
            Fiyat akışı
          </h3>
          {loadState === 'success' && (
            <span className="text-xs font-semibold text-[#84908c]">
              {visiblePrices.length} ürün gösteriliyor
            </span>
          )}
        </div>

        {loadState === 'loading' && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#dbe1de] bg-white p-12 text-center">
            <Loader2 size={32} className="animate-spin text-[#176b45]" />
            <p className="text-sm font-semibold text-[#61706b]">Fiyatlar yükleniyor…</p>
          </div>
        )}

        {loadState === 'error' && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#f0c9cd] bg-[#fdf6f7] p-12 text-center">
            <AlertCircle size={32} className="text-[#c33e49]" />
            <div>
              <p className="text-sm font-bold text-[#c33e49]">Fiyatlar yüklenemedi.</p>
              <p className="mt-1 text-xs font-medium text-[#8a9591]">{errorMsg}</p>
            </div>
            <button
              type="button"
              onClick={() => void fetchPrices()}
              className="flex items-center gap-2 rounded-full bg-[#176b45] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#145938]"
            >
              <RefreshCw size={15} /> Tekrar dene
            </button>
          </div>
        )}

        {loadState === 'success' && visiblePrices.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {visiblePrices.map((item, index) => (
              <article
                key={item.product}
                className="animate-[fade-in-up_450ms_ease-out_both] rounded-2xl border border-[#dbe1de] bg-white p-4 shadow-[0_4px_14px_rgba(21,45,35,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(21,45,35,0.09)] sm:p-5"
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#82908b]">
                      {item.category}
                    </p>
                    <h4 className="text-[18px] font-extrabold tracking-[-0.03em] sm:text-[20px]">
                      {item.product}
                    </h4>
                  </div>
                  <span className="rounded-md bg-[#f1f4f2] px-2 py-1 text-[10px] font-bold text-[#74817c]">
                    {item.market}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[31px] font-extrabold leading-none tracking-[-0.055em] text-[#17211e] sm:text-[35px]">
                      {item.price}
                    </span>
                    <span className="text-xs font-bold text-[#697772]">{item.unit}</span>
                  </div>
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-extrabold ${
                      item.trend === 'up'
                        ? 'bg-[#e8f6ee] text-[#16814b]'
                        : 'bg-[#fcedee] text-[#c33e49]'
                    }`}
                  >
                    {item.trend === 'up' ? (
                      <ArrowUp size={14} strokeWidth={3} />
                    ) : (
                      <ArrowDown size={14} strokeWidth={3} />
                    )}
                    {item.change}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1.5 border-t border-[#edf0ee] pt-3 text-xs font-semibold text-[#77837f]">
                  <span>
                    En Düşük: <strong className="text-[#4c5c56]">{item.low}</strong>
                  </span>
                  <span className="text-[#cdd3d0]">|</span>
                  <span>
                    En Yüksek: <strong className="text-[#4c5c56]">{item.high}</strong>
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {loadState === 'success' && visiblePrices.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#cbd4d0] bg-white p-10 text-center text-sm font-semibold text-[#6d7974]">
            Bu bölgede gösterilecek fiyat bulunmuyor.
          </div>
        )}

        <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#d8dddb] pt-5 text-[11px] font-semibold text-[#8a9591] sm:flex-row">
          <span>Fiyatlar piyasa ortalamalarını gösterir.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#21a665]" />
            Her dakika otomatik güncellenir
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
