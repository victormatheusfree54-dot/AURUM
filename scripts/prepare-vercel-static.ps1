$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$htmlPath = Join-Path $projectRoot 'out/index.html'
$cssPath = Join-Path $projectRoot 'out/_next/static/chunks/1fm_8wh1ihmcu.css'
$outputPath = Join-Path $projectRoot 'vercel-static.html'

$html = Get-Content -LiteralPath $htmlPath -Raw -Encoding UTF8
$css = Get-Content -LiteralPath $cssPath -Raw -Encoding UTF8

$html = [regex]::Replace($html, '<link[^>]+rel="stylesheet"[^>]*>', '')
$html = [regex]::Replace($html, '<link[^>]+as="script"[^>]*>', '')
$html = [regex]::Replace($html, '<script\b[^>]*>[\s\S]*?</script>', '')

$images = @{
  '/images/hero.jpg' = 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=88'
  '/images/hair-detail.jpg' = 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=86'
  '/images/nails.jpg' = 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=86'
  '/images/interior.jpg' = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=86'
  '/images/salon.jpg' = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=86'
  '/images/before-1.jpg' = 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=82'
  '/images/after-1.jpg' = 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=88'
  '/images/before-2.jpg' = 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=82'
  '/images/after-2.jpg' = 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=88'
}

foreach ($entry in $images.GetEnumerator()) {
  $html = $html.Replace($entry.Key, $entry.Value)
}

$script = @'
<script>
document.querySelectorAll('.comparisonRange').forEach(function (range) {
  range.addEventListener('input', function () {
    var comparison = range.closest('.comparison');
    var value = Number(range.value);
    comparison.style.setProperty('--position', value + '%');
    comparison.querySelector('.comparisonBefore').style.clipPath = 'inset(0 ' + (100 - value) + '% 0 0)';
    comparison.querySelector('.comparisonLine').style.left = value + '%';
  });
});
var openButton = document.querySelector('.menuButton');
var closeButton = document.querySelector('.menuClose');
var mobileMenu = document.querySelector('.mobileMenu');
function setMenu(open) {
  mobileMenu.classList.toggle('mobileMenuOpen', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}
if (openButton) openButton.addEventListener('click', function () { setMenu(true); });
if (closeButton) closeButton.addEventListener('click', function () { setMenu(false); });
document.querySelectorAll('.mobileMenu a').forEach(function (link) {
  link.addEventListener('click', function () { setMenu(false); });
});
</script>
'@

$html = $html.Replace('</head>', "<style>$css</style></head>")
$html = $html.Replace('</body>', "$script</body>")

Set-Content -LiteralPath $outputPath -Value $html -Encoding UTF8
Write-Output $outputPath
