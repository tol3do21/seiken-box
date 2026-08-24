import re
import os

html_path = 'd:/TRABAJO/PROYECTO WEB/Proyectos/seiken_box/public/index.html'
css_path = 'd:/TRABAJO/PROYECTO WEB/Proyectos/seiken_box/public/input.css'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract <style> block
style_pattern = re.compile(r'<style>(.*?)</style>', re.DOTALL)
match = style_pattern.search(content)

if match:
    style_content = match.group(1)
    
    # Write to input.css
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write('@tailwind base;\n@tailwind components;\n@tailwind utilities;\n')
        f.write(style_content)
    
    # Remove <style> block and Tailwind CDN from HTML
    new_html = style_pattern.sub('<link rel="stylesheet" href="main.css" />', content)
    
    cdn_pattern = re.compile(r'<script src="https://cdn\.tailwindcss\.com"></script>\s*')
    new_html = cdn_pattern.sub('', new_html)
    
    # Insert JSON-LD Schema and GTM placeholders before </head>
    schema_gtm = """
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
  <!-- End Google Tag Manager -->

  <!-- Schema Markup LocalBusiness -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Seiken Training Box",
    "image": "https://seikenbox.com/imagen/seiken-box-comunidad.jpg",
    "@id": "",
    "url": "https://seikenbox.com/",
    "telephone": "+59169680009",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jaime Mendoza #508",
      "addressLocality": "Sucre",
      "addressCountry": "BO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -19.0488183,
      "longitude": -65.251221
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "06:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/seiken.box",
      "https://instagram.com/seiken.box"
    ]
  }
  </script>
"""
    new_html = new_html.replace('</head>', schema_gtm + '</head>')
    
    # Insert GTM noscript after <body>
    gtm_noscript = """
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
"""
    new_html = re.sub(r'(<body[^>]*>)', r'\1\n' + gtm_noscript, new_html)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Success")
else:
    print("No style block found")
