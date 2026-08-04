# Aurum Beauty Concept — site institucional

Site responsivo em Next.js com visual editorial, serviços, avaliações, localização e dois comparadores interativos de antes e depois.

## Rodar no computador

1. Abra o terminal nesta pasta.
2. Execute `npm install`.
3. Execute `npm run dev`.
4. Abra `http://localhost:3000`.

## Trocar as fotos

No Explorer de arquivos, abra `public/images`. Substitua os arquivos mantendo exatamente o mesmo nome:

- `hero.jpg`: capa do site.
- `hair-detail.jpg`: card de Mega Hair.
- `nails.jpg`: card de Unhas.
- `interior.jpg`: card de Estética.
- `salon.jpg`: seção sobre o espaço.
- `before-1.jpg` e `after-1.jpg`: primeiro resultado.
- `before-2.jpg` e `after-2.jpg`: segundo resultado.

As fotos atuais são demonstrativas e vêm do Unsplash. O efeito mais escuro aplicado às imagens “antes” é apenas visual e pode ser removido em `src/app/globals.css`, na classe `.comparisonBefore`.

## Atualizar contato

O Instagram e o endereço já estão configurados. Quando houver telefone/WhatsApp e horário oficial, adicione essas informações em `src/app/page.tsx`.

## Gerar versão final

Execute `npm run build`. O site está configurado para exportação estática e será criado na pasta `out`.
