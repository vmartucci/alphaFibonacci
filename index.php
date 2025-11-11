<?php // index.php — AlphaFibonacci (con include server-side) ?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>αFibonacci</title>

    <!-- CSS globali del sito -->
    <link rel="stylesheet" href="src/css/header.css">
    <link rel="stylesheet" href="src/css/footer.css">
    <link rel="stylesheet" href="src/css/index.css">
</head>

<body>

<!-- ===== HEADER ===== -->
<?php include(__DIR__ . "/src/pages/header.html"); ?>


<!-- ===== SEZIONE VITA ===== -->
<div class="titolo-sezioneVita" id="vita">
    <h2>Vita</h2>
</div>

<div class="rettangolo-sezione">
    <div class="blocco">
        <div class="contenuto-testo txt-left">
            <h3>Le origini di Fibonacci</h3>
            <p>
                Leonardo Pisano, conosciuto come Fibonacci, nacque a Pisa nel 1170.
                Viaggiò molto nel Mediterraneo e apprese il sistema di numerazione indo-arabico,
                che introdusse poi in Europa.
            </p>
        </div>
        <div class="contenuto-immagine img-right">
            <img src="src/resources/img/img1.png" alt="Ritratto di Fibonacci">
        </div>
    </div>

    <div class="blocco">
        <div class="contenuto-immagine img-left">
            <img src="src/resources/img/img1.png" alt="Successione di Fibonacci">
        </div>
        <div class="contenuto-testo txt-right">
            <h3>Le sue scoperte</h3>
            <p>
                Nel suo libro <em>Liber Abaci</em>, pubblicato nel 1202,
                Fibonacci spiegò l’uso delle cifre arabe e introdusse la celebre successione
                che porta il suo nome.
            </p>
        </div>
    </div>
</div>


<!-- ===== SEZIONE MATEMATICA ===== -->
<div class="titolo-sezioneMate" id="matematica">
    <h2>Matematica</h2>
</div>

<div class="rettangolo-sezione">
    <div class="blocco">
        <div class="contenuto-testo txt-left">
            <h3>Approfondimenti matematici</h3>
            <p>
                La successione di Fibonacci è collegata al rapporto aureo e a molte proprietà
                combinatorie e geometriche interessanti.
            </p>
        </div>
        <div class="contenuto-immagine img-right">
            <img src="src/resources/img/img1.png" alt="Diagramma matematico">
        </div>
    </div>

    <div class="blocco">
        <div class="contenuto-immagine img-left">
            <img src="src/resources/img/img1.png" alt="Applicazioni della successione">
        </div>
        <div class="contenuto-testo txt-right">
            <h3>Applicazioni</h3>
            <p>
                La successione di Fibonacci appare in natura, in algoritmi e in applicazioni grafiche:
                è uno strumento molto versatile.
            </p>
        </div>
    </div>

    <!-- (esempio) calcolatore -->
    <section class="sezione-matematica">
        <div class="sotto-sezione-matematica">
            <h3 class="fib-titolo">Prova il calcolatore della sequenza di Fibonacci</h3>
            <div class="fib-input-container">
                <label for="fib-num" class="fib-label">Quanti numeri vuoi visualizzare?</label>
                <input type="number" id="fib-num" min="1" placeholder="Inserisci un numero" />
            </div>
            <button id="fib-calc">CALCOLA</button>
            <div id="fib-risultati"></div>
        </div>
    </section>
</div>


<!-- ===== SEZIONE MINI-GIOCHI ===== -->
<div class="titolo-sezioneMate" id="Mini-Giochi">
    <h2>Mini-Giochi</h2>
</div>

<div class="rettangolo-sezione">
    <div class="mini-giochi-container">
        <div class="mini-gioco">
            <h3 class="mini-titolo">Crea il rettangolo Aureo</h3>
            <p class="mini-descrizione">
                Metti alla prova la tua conoscenza trascinando i quadrati (1, 1, 2, 3, 5) per comporre il rettangolo aureo.
            </p>
            <button class="mini-bottone" id="start-game">INIZIA SFIDA</button>
        </div>

        <div class="mini-gioco">
            <h3 class="mini-titolo">Indovina la sequenza</h3>
            <p class="mini-descrizione">
                Riesci a indovinare i numeri mancanti della sequenza? Sfida te stesso!
            </p>
            <button class="mini-bottone">INIZIA SFIDA</button>
        </div>
    </div>

    <!-- QUI dentro vogliamo visualizzare il gioco (inizialmente nascosto) -->
    <?php include(__DIR__ . "/src/pages/giochi/rettangoloAureo.html"); ?>
</div>


<!-- ===== FOOTER ===== -->
<?php include(__DIR__ . "/src/pages/footer.html"); ?>


<!-- ===== SCRIPT GLOBALI ===== -->
<script src="src/js/sequenzaFib.js"></script>

<!-- Mostra il gioco solo su click -->
<script>
document.getElementById("start-game").addEventListener("click", () => {
  const game = document.getElementById("gioco-rettangolo");
  if (game) {
    game.style.display = "block";
    window.scrollTo({ top: game.offsetTop - 80, behavior: "smooth" });
  }
});
</script>

</body>
</html>
