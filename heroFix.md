Buat ulang layout HERO IMAGE dan SMALL FLOATING IMAGES agar SEMIRIP MUNGKIN dengan screenshot referensi.

JANGAN membuat layout fullscreen.
JANGAN membuat collage random.
JANGAN menggunakan rotate scattered Pinterest style.

Saya ingin layout editorial luxury wedding yang clean dan fixed composition.

HERO IMAGE UTAMA

Hero image HARUS:

berada tepat di tengah
ukuran TIDAK fullscreen
background cream masih terlihat luas di semua sisi
rounded corner sangat besar
cinematic composition

Gunakan ukuran dan posisi EXACT ini:

className="
absolute
left-1/2
top-[11%]
-translate-x-1/2
w-[48vw]
h-[78vh]
rounded-[48px]
overflow-hidden
z-20
"

Image:

<Image
  fill
  className="object-cover"
/>

JANGAN gunakan:

h-screen
w-screen

Karena layout referensi bukan fullscreen hero.

GAMBAR KECIL DI SEKITAR HERO

Layout harus FIXED POSITION seperti editorial collage.

Bukan random.
Bukan scattered.
Bukan rotate berlebihan.

Gunakan EXACT positioning berikut:

LEFT TOP IMAGE

Landscape image.

className="
absolute
left-[2%]
top-[4%]
w-[24vw]
h-[34vh]
rounded-[32px]
overflow-hidden
z-10
"

Motion:

initial={{ opacity: 0, y: -40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 1 }}
LEFT BOTTOM IMAGE

Black & white couple image.

className="
absolute
left-[5%]
top-[46%]
w-[19vw]
h-[26vh]
rounded-[32px]
overflow-hidden
z-10
"

Motion:

initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 1, delay: 0.1 }}
RIGHT TOP IMAGE

Vertical cliff image.

className="
absolute
right-[3%]
top-[26%]
w-[18vw]
h-[28vh]
rounded-[32px]
overflow-hidden
z-10
"

Motion:

initial={{ opacity: 0, x: 40 }}
whileInView={{ opacity: 1, x: 0 }}
transition={{ duration: 1, delay: 0.2 }}
RIGHT BOTTOM IMAGE

POV legs image.

className="
absolute
right-[1%]
bottom-[2%]
w-[23vw]
h-[38vh]
rounded-[32px]
overflow-hidden
z-10
"

Motion:

initial={{ opacity: 0, y: 50 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 1, delay: 0.3 }}
ON SCROLL BEHAVIOR : seperti yang sudah exisitng, cukup sesuaikan ukuran gambar utama dan 4 gambar disekitar