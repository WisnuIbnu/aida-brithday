PROMPT: MODAL DENGAN KONTEN TERSTRUKTUR (HEADING & KOMPONEN TERPISAH)
Deskripsi
Buatlah sebuah modal untuk menampilkan detail card dengan konten yang terstruktur menggunakan heading levels (H1, H2) dan komponen render terpisah untuk setiap tipe konten. Ini memungkinkan fleksibilitas dalam mengisi nilai modal dengan format yang berbeda-beda (heading besar, heading sedang, paragraf, list, teks multi-line).

1. Struktur Data
typescript
type DetailPhoto = {
  src: string;
  caption: string;
};

type DetailSection = {
  type: 'heading1' | 'heading2' | 'paragraph' | 'list' | 'text';
  content: string;
  items?: string[]; // untuk tipe 'list'
};

type DetailCard = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  photos: DetailPhoto[];
  sections: DetailSection[]; // Ganti 'body' dengan 'sections'
};
2. Tipe-tipe Section
Type	Fungsi	Styling	Props
heading1	Heading utama (H1)	Font display, uppercase, ukuran besar (text-2xl sm:text-3xl), bold, tracking lebar	content: string
heading2	Heading kedua (H2)	Font display, ukuran sedang (text-xl sm:text-2xl), semibold	content: string
paragraph	Paragraf biasa	Text size small-medium (text-sm sm:text-base), leading relax, warna abu	content: string
list	Bullet list	Dengan bullet point (•), spacing antar item, indent	content: string, items: string[]
text	Multi-line text	Mempertahankan line breaks (\n), multiple paragraphs	content: string
3. Komponen Render Section
Buatlah sebuah komponen RenderSection yang menerima section sebagai props dan merender konten berdasarkan tipe:

tsx
function RenderSection({ section }: { section: DetailSection }) {
  switch (section.type) {
    case 'heading1':
      // Render heading 1 dengan styling: uppercase, font-display, text-2xl sm:text-3xl, tracking-wider
    case 'heading2':
      // Render heading 2 dengan styling: font-display, text-xl sm:text-2xl, semibold
    case 'paragraph':
      // Render paragraf dengan styling: text-sm sm:text-base, leading-7 sm:leading-8
    case 'list':
      // Render bullet list dengan bullet point • dan spacing antar item
    case 'text':
      // Render multi-line text dengan split('\n') dan map ke <p>
    default:
      return null;
  }
}
4. Data Contoh
Buatlah data dengan struktur sections untuk setiap card:

typescript
const detailCards: DetailCard[] = [
  {
    id: 1,
    title: "Travel & Accommodations",
    subtitle: "Plan your trip",
    description: "Use this page to help guests plan their trip, book a stay, and navigate the weekend with less guesswork.",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
        caption: "Travel destination",
      }
    ],
    sections: [
      { type: 'heading1', content: 'FLIGHT' },
      { type: 'heading2', content: 'Getting There' },
      { type: 'paragraph', content: 'Add the closest airport, train station, or driving instructions guests should use when planning their trip.' },
      { type: 'heading1', content: 'TRAVEL NOTE' },
      { type: 'heading2', content: 'Staying' },
      { type: 'paragraph', content: 'Share your preferred hotel block, neighborhood, or rental guidance here so guests know where to stay.' }
    ]
  },
  // Card 2 dengan sections berbeda
  {
    id: 2,
    title: "Wedding Parties",
    subtitle: "Who is standing with us",
    description: "The people closest to the couple, helping carry the day with love and calm energy.",
    image: "https://images.unsplash.com/photo-1523438097201-512ae7d59f87?auto=format&fit=crop&w=1400&q=80",
    photos: [
      // ... photos
    ],
    sections: [
      { type: 'heading1', content: 'THE BRIDAL PARTY' },
      { type: 'heading2', content: 'Maid of Honor' },
      { type: 'paragraph', content: 'Sarah Johnson - Best friend since childhood' },
      { type: 'heading2', content: 'Best Man' },
      { type: 'paragraph', content: 'Michael Chen - Brother of the groom' },
      { type: 'heading1', content: 'THE GROOMSMEN' },
      { type: 'list', content: 'Groomsmen', items: ['David Williams', 'James Rodriguez', 'Thomas Lee'] }
    ]
  }
];
5. Modal Content Structure
Di dalam modal, tampilkan:

tsx
<div className="overflow-y-auto max-h-[75vh] px-8 pb-6 sm:px-12 sm:pb-8 md:px-16 lg:px-20 lg:pb-10">
  
  {/* 1 Foto Besar dengan navigasi */}
  {/* ... */}
  
  {/* Container untuk sections */}
  <div className="mt-6 rounded-[1.75rem] border border-[#e7dccd] bg-white/60 p-5 shadow-[0_10px_30px_rgba(74,55,44,0.06)] backdrop-blur-sm sm:p-7 lg:p-10">
    {activeCard.sections.map((section, idx) => (
      <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
        <RenderSection section={section} />
      </div>
    ))}
  </div>
  
  {/* Scroll indicator */}
  {/* ... */}
</div>
6. Styling Detail untuk Setiap Section
Heading 1:

Font: font-display

Ukuran: text-2xl sm:text-3xl

Weight: font-bold

Transform: uppercase

Tracking: tracking-[0.15em]

Warna: text-[#2a211c]

Heading 2:

Font: font-display

Ukuran: text-xl sm:text-2xl

Weight: font-semibold

Margin top: mt-4 (jika ada section sebelumnya)

Warna: text-[#2a211c]

Paragraph:

Ukuran: text-sm sm:text-base

Line height: leading-7 sm:leading-8

Warna: text-[#6f6359]

Margin top: mt-2

List:

Spacing: space-y-1.5

Indent: pl-4

Bullet: • dengan warna text-[#8f7765]

Text: text-sm sm:text-base

Warna: text-[#6f6359]

Text (Multi-line):

Split content dengan \n

Map ke <p> dengan mt-2 untuk setiap line

Styling sama dengan paragraph

7. Fitur Navigasi Foto
Modal harus memiliki:

Tombol Previous/Next (kiri/kanan) untuk navigasi foto

Indikator dot di bawah foto untuk menunjukkan posisi foto

Keyboard navigation (panah kiri/kanan) untuk navigasi foto

Escape key untuk menutup modal

8. Padding Kontrol
Padding konten modal harus bisa diatur dengan mudah:

tsx
{/* Ubah padding di sini untuk mengontrol lebar konten */}
<div className="overflow-y-auto max-h-[75vh] px-8 pb-6 sm:px-12 sm:pb-8 md:px-16 lg:px-20 lg:pb-10">
Breakpoint	Padding Horizontal	Padding Bottom
Mobile	px-8 (2rem)	pb-6 (1.5rem)
Tablet (sm)	px-12 (3rem)	pb-8 (2rem)
Tablet (md)	px-16 (4rem)	-
Desktop (lg)	px-20 (5rem)	pb-10 (2.5rem)
9. Fleksibilitas Konten
Dengan struktur ini, setiap card bisa memiliki:

Heading 1 untuk judul utama section

Heading 2 untuk sub-judul

Paragraph untuk deskripsi

List untuk bullet points

Text untuk multi-line content

Contoh penggunaan:

Travel card: Flight (H1) → Getting There (H2) → Deskripsi (P)

Wedding card: Bridal Party (H1) → Maid of Honor (H2) → Nama (P)

Schedule card: Timeline (H1) → Morning (H2) → Aktivitas (List)

10. Yang Perlu Diperhatikan
Data structure harus fleksibel untuk berbagai jenis konten

RenderSection harus handle semua tipe section dengan baik

Styling harus konsisten dan responsif

Padding konten harus mudah diatur

Navigasi foto harus intuitif

Aksesibilitas (keyboard navigation, ARIA labels)

Summary
Bagian	Deskripsi
Data Structure	sections array dengan type, content, dan items
RenderSection	Switch case untuk render setiap tipe section
Heading 1	H1 besar, uppercase, tracking lebar
Heading 2	H2 sedang, bold, margin top
Paragraph	Teks biasa dengan leading relax
List	Bullet list dengan items array
Text	Multi-line dengan line breaks
Padding	Dapat diatur via className pada container
