# Redação UEG Sem Mistério — Landing Page de Alta Conversão

Landing Page oficial de vendas para o infoproduto **"Redação UEG Sem Mistério"**, ministrado pela **Professora Gabrii** (*Estude com Gabrii*).

Totalmente otimizada para **Mobile-First**, **Desktop**, carregamento ultrarrápido (sub-segundo) e **100% pronta para publicação no GitHub Pages**.

---

## 🚀 Como Adicionar Seus Links de Checkout (Hotmart, Kiwify, Eduzz, etc.)

Abra o arquivo [`script.js`](./script.js) e insira os seus links logo no início (linhas 7 a 11):

```javascript
const CONFIG = {
  // 1. Cole aqui o link de checkout do curso (R$ 37,90):
  checkoutUrl: "https://pay.kiwify.com.br/SEU_CODIGO",

  // 2. Cole aqui o link do checkout com a Correção Individual incluída (+ R$ 20,00):
  checkoutWithBumpUrl: "https://pay.kiwify.com.br/SEU_CODIGO_COM_BUMP",

  // Data Oficial da Prova UEG 2026:
  examDate: new Date("2026-10-18T13:00:00-03:00").getTime()
};
```

*Todos os botões da página (Hero, Oferta Principal, Order Bump e Sticky Footer Mobile) serão direcionados automaticamente para esses links!*

---

## 🌐 Como Publicar no GitHub Pages (Passo a Passo Rápido)

1. Crie um novo repositório vazio no seu GitHub (ex: `redacao-ueg-sem-misterio`).
2. Abra o terminal nesta pasta e execute:
   ```bash
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
3. No seu repositório no GitHub:
   - Vá em **Settings** (Configurações) ➔ **Pages** (no menu lateral).
   - Em **Build and deployment** / **Branch**: selecione a branch `main` e a pasta `/ (root)`.
   - Clique em **Save**.
4. Em cerca de 1 a 2 minutos, o seu site estará no ar gratuitamente no link:
   `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`

---

## 📱 Recursos Especiais Inclusos
- **Design System Mobile-First**: 100% fluido em celulares (iPhone e Android) e telas ultrawide 4K.
- **Logo Oficial Completa**: Sem repetições de título, com tipografia fiel.
- **Mockup 3D com Frame Real da Professora**: Aula real gravada pela Professora Gabrii no notebook.
- **Contador de Urgência Ativo**: Calcula os dias, horas e minutos até a prova de 18 de Outubro de 2026.
- **Critérios Reais da UEG**: Copy adaptada para a escala oficial de **até 100 pontos** (diferenciando-se das fórmulas do ENEM).
- **FAQ Sanfona**: Accordion interativo e acessível.
- **Sticky CTA Mobile**: Botão flutuante no rodapé do smartphone para maximizar as conversões dos stories do Instagram.
