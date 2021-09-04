<h1> Facade-colorizer </h1>

<h2>Istruzioni per la segmentazione delle aree di interesse della facciata</h2>
<ul>
  <li>Installare o usufruire online del tool CVAT accessibile al seguente link: https://github.com/opencv/cvat</li>
  <li>Dopo aver fatto l'accesso cliccare su "Create new task".</li>
  <li>Durante la configurazione aggiungere 3 label assegnando i seguenti nomi: "<b>Stanza</b>", "<b>Termosifone</b>" e "<b>Finestra</b>".
  <li>Aggiungere i seguenti attributi:
    <ul>
      <li>Per la label "Stanza" assegnare all'attributo il nome "<b>ID</b>" (si riferisce all'identificatore della stanza).</li>
      <li>Per le label "Termosifone" e "Finestra" assegnare all'attributo il nome "<b>IDStanza</b>" (si riferisce all'identificatore della stanza in cui sono contenute).</li>
    </ul>
  </li>
  <li>Caricare la foto della facciata. Condizione necessaria per il funzionamento corretto del programma è che la foto sia <b>frontale</b> e <b>non ruotata</b>.</li>
  <li>Una volta terminata la configurazione si puo iniziare con la segmentazione delle aree:
    <ul>
      <li>Selezionare le aree di interesse specificando la label. </li>
      <li>Settare gli attributi dei vari elementi.</li>
    </ul>
  </li>
  <li>Una volta terminato il tutto, salvare, cliccare su "Dump Annotations" e selezionare "COCO 1.0" per scaricare il file con le annotazioni sulle aree segmentate.
  <li>Copiare il file .json scaricato nella cartella res/cvat/annotations del progetto.
  <li>Inserire l'immagine della facciata nella cartella res/cvat/images del progetto.
</ul>

<h2> Istruzioni per poter utilizzare la web app </h2>

<ul> 
  <li> Far partire la classe src.Main. Questa attiverà il server. </li>
  <li> Accedere da un browser a http://localhost:8080/index </li>
</ul>
