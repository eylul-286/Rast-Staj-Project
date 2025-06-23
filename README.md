# Rast Mobile Kanban Board

Bu proje, React.js ile geliştirilmiş modern ve responsive bir Kanban Board uygulamasının frontend kısmını içerir. Kullanıcılar farklı board'lar oluşturabilir, son gezilen board'ları görebilir ve her board'da sabit kartları inceleyebilir. Tüm veriler localStorage'da saklanır.

## Özellikler

- **Modern Banner Başlık:** Board adı ve URL’si, sayfanın üst kısmında ince uzun ve responsive bir banner olarak gösterilir.
- **Sayfa ve Component Yapısı:** Ana sayfa ve dinamik board sayfaları (örn. `/board/:id`). Board, List, Card gibi componentlere ayrılmış yapı.
- **State ve Veri Yönetimi:** Tüm veriler React state ve localStorage'da tutulur. Board'lar ve kartlar sayfa yenilense bile kaybolmaz. Her board'da sabit 4 liste bulunur: Backlog, To Do, In Progress, Done.
- **Statik Kartlar:** Her board’da, sabit ve düzenlenemeyen örnek kartlar gösterilir. Kart ekleme veya silme işlemleri yoktur.
- **Routing:** React Router ile dinamik board ID'li sayfalar. URL değişince ilgili board'un içeriği gösterilir.
- **Son Gezilen Boardlar:** Kullanıcının gezdiği board ID'leri localStorage'da tutulur. Son gezilenler ekranda gösterilir ve tıklanabilir. Temizle butonu ile geçmiş silinebilir.
- **Responsive Tasarım:** Tüm componentler mobil ve masaüstü uyumlu olacak şekilde tasarlanmıştır.
- **Kullanıcı Deneyimi:** Modern ve sade arayüz, hızlı erişim ve kolay kullanım.

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için:

1. Projeyi klonlayın:
    ```bash
    git clone https://github.com/your-username/rastmobile.git
    cd rastmobile/client
    ```
2. Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
3. Projeyi başlatın:
    ```bash
    npm run dev
    ```

Uygulama `http://localhost:5173` adresinde çalışacaktır (veya terminalde belirtilen başka bir portta). Board sayfalarına erişmek için `http://localhost:5173/board/1`, `http://localhost:5173/board/abc` gibi URL'leri kullanabilirsiniz.

## Kullanılan Teknolojiler

- React.js
- React Router
- Vite (Geliştirme Ortamı)
- CSS (Modüler ve Responsive Tasarım için)
- localStorage (Veri Kalıcılığı için)

## Ekran Görüntüleri

(Buraya uygulamanın ekran görüntüleri eklenebilir.)

## Proje Yol Haritası

Projenin detaylı yol haritası ve geliştirme notları için [PROJE_YOL_HARİTASI.md](PROJE_YOL_HARITASI.md) dosyasına bakınız.
