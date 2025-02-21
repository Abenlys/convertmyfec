import React, { useState } from "react";
import styles from "./MacroVBA.module.css";
import Image from "next/image";
import ouvrirAvec from "../../public/ouvrirAvec.png";
import selectionnerColonneA from "../../public/SelectionnerColonneA.png";
import donneesPuisConvertir from "../../public/donnéesPuisConvertir.png";
import conversionEtape1 from "../../public/conversionEtape1.png";
import choixSeparateur from "../../public/choixSeparateur.png";
import donneesVentileesParColonnes from "../../public/donnéesVentiléesParColonnes.png";
import clicDroitAfficherCode from "../../public/clicDroitAfficherCode.png";
import avtModif from "../../public/avtModif.png";
import leResultat from "../../public/leResultat.png";
import executionMacro from "../../public/executionMacro.png";
import racineCpteAuxFrnsAvt from "../../public/racineCpteAuxFrnsAvtModif.png";
import racineCpteAuxFrnsApresModif from "../../public/racineCpteAuxFrnsApresModif.png";
import CodeBlock from "./CodeBlock";

export default function MacroVBA() {
  const codeVBA = `
Sub modifierComptesAux()
    Dim ws As Worksheet
    Dim lastRow As Long, i As Long
    Dim x As Integer, y As String
    Dim racineFournisseur As String, racineClient As String

    'Def feuille Active
    Set ws = ActiveSheet

    'Trouver la dernière ligne utilisée dans la colonne G
    lastRow = ws.Cells(Rows.Count, "G").End(xlUp).Row

    'Etape 1 : Modification pour les fournisseurs
    racineFournisseur = InputBox("[FOURNISSEURS] Entrez la racine des comptes auxiliaires fournisseurs (ex: 401) :", "Racine du compte fournisseur")
    racineFournisseur = Trim(racineFournisseur)

    'Vérification de l'entrée utilisateur
    If racineFournisseur = "" Then
        MsgBox "Veuillez entrer une racine valide pour les fournisseurs.", vbExclamation
        Exit Sub
    End If
    
    'Calcul du nombre de caractère a retirer
    x = Len(racineFournisseur)
    
    'demander la nouvelle racine à l'utilisateur
    y = InputBox("[FOURNISSEURS] Entrez la nouvelle racine des comptes auxiliaires fournisseurs :", "Nouvelle racine du compte")
    y = Trim(y)
    
    'Vérification de l'entrée utilisateur
    If y = "" Then
        MsgBox "Veuillez entrer une nouvelle racine valide pour les fournisseurs.", vbExclamation
        Exit Sub
    End If
    
    'On boucle sur les fournisseurs
    For i = 2 To lastRow
         If ws.Cells(i, "E").Value Like "401*" Then
            If Len(ws.Cells(i, "G").Value) >= x Then
                ws.Cells(i, "G").Value = y & Mid(ws.Cells(i, "G").Value, x + 1, Len(ws.Cells(i, "G").Value) - x)
            End If
        End If
    Next i
    
    'Etape 2 : Modifications pour les clients
    racineClient = InputBox("[CLIENTS] Entrez la racine des comptes auxiliaires fournisseurs (ex: 411) :", "Racine du compte client")
    racineClient = Trim(racineClient)
    
    'Vérification de l'entrée utilisateur
    If racineClient = "" Then
        MsgBox "Veuillez entrer une racine valide pour les clients.", vbExclamation
        Exit Sub
    End If
    
    'Calcul du nombre de caractères à retirer
    x = Len(racineClient)
    
    'Demander les caractères à ajouter au début
    y = InputBox("[CLIENTS] Entrez la nouvelle racine des comptes auxiliaires fournisseurs :", "Nouvelle racine du compte")
    y = Trim(y)
    
    'Vérification de l'entrée utilisateur
    If y = "" Then
        MsgBox "Veuillez entrer une nouvelle racine valide pour les clients.", vbExclamation
        Exit Sub
    End If
    
    'On boucle sur les clients
    For i = 2 To lastRow
         If ws.Cells(i, "E").Value Like "411*" Then
            If Len(ws.Cells(i, "G").Value) >= x Then
                ws.Cells(i, "G").Value = y & Mid(ws.Cells(i, "G").Value, x + 1, Len(ws.Cells(i, "G").Value) - x)
            End If
        End If
    Next i
    
    MsgBox "Modifications terminées pour les comptes " & racineFournisseur & " et " & racineClient & " !", vbInformation
    
End Sub
`;

  return (
    <div className={styles.containerMacro}>
      <p className={styles.marginBotMacro}>
        Si vous souhaitez faire cette tâche dans Excel sans passer par le
        service ci-dessus, vous pouvez coller le code VBA ci-dessous :{" "}
      </p>
      <p className={styles.pasAPas}>
        <span>Le pas à pas détaillé pour coller et executer le code :</span>
      </p>
      <ul>
        <li>
          Faites systématiquement une copie au préalable de votre FEC que vous
          avez reçu du client ou que vous avez éditez vous-même du logiciel du
          client, en cas d'erreur de manipulation, vous n'avez pas altérez
          l'original
        </li>
        <li>
          Faites un clic droit sur le fichier txt (votre FEC) puis ouvrir avec
          Excel
        </li>
        <li>
          <Image src={ouvrirAvec} width={300} alt="Ouvrir avec Excel" />
        </li>
        <li>
          A l'ouverture du fichier, vous aurez certainement un bandeau vous
          indiquant qu'il y a une perte de données potentielle, on s'en moque
          dans le cadre de cette procédure. l'impact est que la macro que vous
          allez copier par la suite ne sera pas enregistrée.
        </li>
        <li>
          Une fois ouvert, vous remarquerez que les données ne sont pas bien
          ventilées par colonnes, donc il faut le faire
        </li>
        <li>Sélectionner la colonne A en cliquant sur la colonne A</li>
        <li>
          <Image
            src={selectionnerColonneA}
            width={300}
            alt="selectionner colonne A"
          />
        </li>
        <li>Allez dans l'onglet Données puis convertir</li>
        <li>
          <Image
            src={donneesPuisConvertir}
            width={300}
            alt="Données puis convertir"
          />
        </li>
        <li>
          Première étape de la conversion, veillez à ce que Délimité soit coché,
          toujours le cas par défaut puis suivant
        </li>
        <li>
          <Image src={conversionEtape1} width={300} alt="Conversion Etape 1" />
        </li>
        <li>
          Etape 2 conversion : cliquer sur le séparateur qui convient à votre
          FEC, si vous ne savez pas, selectionnez les options et regardez si la
          ventilation dans les colonnes se fait dans l'espace de
          prévisualisation. Dans l'image ci-dessous, c'est un cas assez exotique
          puisqu'il s'agit de la barre verticale ou "PIPE" que l'on fait sur PC
          avec altGr + 6 (au dessus de la lettre T) et sur mac avec
          maj+Control+L
        </li>
        <li>
          <Image
            src={choixSeparateur}
            width={300}
            alt="Etape 2 conversion : choix du séparateur"
          />
        </li>
        <li>Par la suite, cliquer sur suivant puis fin</li>
        <li>Les données sont désormais ventilées par colonnes</li>
        <li>
          <Image
            src={donneesVentileesParColonnes}
            width={300}
            alt="Données ventilées par colonnes"
          />
        </li>
        <li>
          Faites un clic droit sur votre feuille et faites afficher le code...
        </li>
        <li>
          <Image
            src={clicDroitAfficherCode}
            width={300}
            alt="Clic droit et afficher le code"
          />
        </li>
        <li>Cela ouvrira VBA et vous pourrez coller le code.</li>
        <li>
          Avant d'éxécuter la macro, regardez a quoi ressemble les comptes
          auxiliaires. <br />
          Cas d'espèces :
        </li>
        <li>
          <Image src={avtModif} width={300} alt="avant modification" />
        </li>
        <li>
          Je constate que les comptes auxiliaires pour les fournisseurs
          commencent par 9 <br /> et que pour les clients, cela commence par 0
          Donc, je renseignerai 9 pour les fournisseurs et 0 pour les clients .
          <br /> Maintenant que j'ai pris connaissance du contexte, j'execute la
          macro
        </li>
        <li>
          <Image src={executionMacro} width={300} alt="execution de la macro" />
        </li>
        <li>
          Ci-dessous, les deux prochaines images montrent le traitement pour les
          fournisseurs, repeter le processus avec les clients.
        </li>
        <li>
          <Image
            src={racineCpteAuxFrnsAvt}
            width={300}
            alt="Racine Cpte Auxiliaires fournisseurs avant modification"
          />
        </li>
        <li>
          <Image
            src={racineCpteAuxFrnsApresModif}
            width={300}
            alt="Racine Cpte Auxiliaires fournisseurs après modification"
          />
        </li>
        <li>Le résultat</li>
        <li>
          <Image src={leResultat} width={300} alt="Resultat" />
        </li>
      </ul>
      <CodeBlock codeVBA={codeVBA} />
    </div>
  );
}
