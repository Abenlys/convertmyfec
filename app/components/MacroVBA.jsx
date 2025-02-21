import React from 'react'
import styles from './MacroVBA.module.css'
import Image from 'next/image'
import ouvrirAvec from '../../public/ouvrirAvec.png'
import selectionnerColonneA from '../../public/SelectionnerColonneA.png'
import donneesPuisConvertir from "../../public/donnéesPuisConvertir.png"
import conversionEtape1 from "../../public/conversionEtape1.png"
import choixSeparateur from "../../public/choixSeparateur.png"
import donneesVentileesParColonnes from "../../public/donnéesVentiléesParColonnes.png"
import clicDroitAfficherCode from "../../public/clicDroitAfficherCode.png"
import avtModif from "../../public/avtModif.png"
import nbreDeCaractereARetirer from "../../public/nbreDeCaractereARetirer.png"
import caracteresVoulus from "../../public/caracteresVoulus.png"
import leResultat from "../../public/leResultat.png"
import executionMacro from "../../public/executionMacro.png"

export default function MacroVBA() {

    const codeVBA = `
Sub ModifierColonneG()
    Dim ws As Worksheet
    Dim lastRow As Long, i As Long
    Dim x As Integer, y As String

    ' Définition de la feuille active
    Set ws = ActiveSheet

    ' Trouver la dernière ligne utilisée dans la colonne G
    lastRow = ws.Cells(ws.Rows.Count, "G").End(xlUp).Row

    ' Étape 1 : Modifier les lignes où la colonne E commence par 411
    x = InputBox("[411] Entrez le nombre de caractères à retirer de la colonne G :", "Retrait de caractères")
    y = InputBox("[411] Entrez les caractères à ajouter au début de la colonne G :", "Ajout de caractères")

    For i = 2 To lastRow
        If ws.Cells(i, "E").Value Like "411*" Then
            If Len(ws.Cells(i, "G").Value) >= x Then
                ws.Cells(i, "G").Value = y & Mid(ws.Cells(i, "G").Value, x + 1, Len(ws.Cells(i, "G").Value) - x)
            End If
        End If
    Next i

    ' Étape 2 : Modifier les lignes où la colonne E commence par 401
    x = InputBox("[401] Entrez le nombre de caractères à retirer de la colonne G :", "Retrait de caractères")
    y = InputBox("[401] Entrez les caractères à ajouter au début de la colonne G :", "Ajout de caractères")

    For i = 2 To lastRow
        If ws.Cells(i, "E").Value Like "401*" Then
            If Len(ws.Cells(i, "G").Value) >= x Then
                ws.Cells(i, "G").Value = y & Mid(ws.Cells(i, "G").Value, x + 1, Len(ws.Cells(i, "G").Value) - x)
            End If
        End If
    Next i

    ' Message de confirmation
    MsgBox "Modification terminée !", vbInformation
End Sub`
  return (
    <div className={styles.containerMacro}>
    <p className={styles.marginBotMacro}>Si vous souhaitez faire cette tâche dans Excel sans passer par le service ci-dessus, vous pouvez coller le code VBA ci-dessous : </p>
    <p className={styles.pasAPas}><span>Le pas à pas détaillé pour coller et executer le code :</span></p>
    <ul>
        <li>
            Faites systématiquement une copie au préalable de votre FEC que vous avez reçu du client ou que vous avez éditez vous-même du logiciel du client, en cas d'erreur de manipulation, vous n'avez pas altérez l'original
        </li>
        <li>
            Faites un clic droit sur le fichier txt (votre FEC) puis ouvrir avec Excel
        </li>
        <li>
            <Image
            src={ouvrirAvec}
            width={300} 
            alt='Ouvrir avec Excel'
            />
        </li>
        <li>
            A l'ouverture du fichier, vous aurez certainement un bandeau vous indiquant qu'il y a une perte de données potentielle, on s'en moque dans le cadre de cette procédure. l'impact est que la macro que vous allez copier par la suite ne sera pas enregistrée.
        </li>
        <li>
            Une fois ouvert, vous remarquerez que les données ne sont pas bien ventilées par colonnes, donc il faut le faire
        </li>
        <li>
            Sélectionner la colonne A en cliquant sur la colonne A
        </li>
        <li>
            <Image
            src={selectionnerColonneA}
            width={300}
            alt='selectionner colonne A'
            />
        </li>
        <li>
            Allez dans l'onglet Données puis convertir
        </li>
        <li>
            <Image
            src={donneesPuisConvertir}
            width={300}
            alt='Données puis convertir'
            />
        </li>
        <li>
            Première étape de la conversion, veillez à ce que Délimité soit coché, toujours le cas par défaut puis suivant
        </li>
        <li>
            <Image
            src={conversionEtape1}
            width={300}
            alt='Conversion Etape 1'
            />
        </li>
        <li>
            Etape 2 conversion : cliquer sur le séparateur qui convient à votre FEC, si vous ne savez pas, selectionnez les options et regardez si la ventilation dans les colonnes se fait dans l'espace de prévisualisation. Dans l'image ci-dessous, c'est un cas assez exotique puisqu'il s'agit de la barre verticale ou "PIPE" que l'on fait sur PC avec altGr + 6 (au dessus de la lettre T) et sur mac avec maj+Control+L
        </li>
        <li>
            <Image
            src={choixSeparateur}
            width={300}
            alt='Etape 2 conversion : choix du séparateur'
            />
        </li>
        <li>
            Par la suite, cliquer sur suivant puis fin
        </li>
        <li>
            Les données sont désormais ventilées par colonnes
        </li>
        <li>
            <Image
            src={donneesVentileesParColonnes}
            width={300}
            alt='Données ventilées par colonnes'
            />
        </li>
        <li>
            Faites un clic droit sur votre feuille et faites afficher le code...
        </li>
        <li>
            <Image
            src={clicDroitAfficherCode}
            width={300}
            alt='Clic droit et afficher le code'
            />
        </li>
        <li>
            Cela ouvrira VBA et vous pourrez coller le code.
        </li>
        <li>
            Avant d'éxécuter la macro, regardez a quoi ressemble les comptes auxiliaires. <br />
            Cas d'espèces :
        </li>
        <li>
            <Image
            src={avtModif}
            width={300}
            alt='avant modification'
            />
        </li>
        <li>
            Je constate que les comptes auxiliaires pour les clients commencent par 0 <br /> et que pour les fournisseurs, cela commence par 9
            Donc, comme il y a un seul caractère je mettrai 1 dans la première inputBox.<br /> Maintenant que j'ai pris connaissance du contexte, j'execute la macro
        </li>
        <li>
            <Image
            src={executionMacro}
            width={300}
            alt='execution de la macro'
            />
        </li>
        <li>
            <Image
            src={nbreDeCaractereARetirer}
            width={300}
            alt='première inputBox'
            />
        </li>
        <li>
            <Image
            src={caracteresVoulus}
            width={300}
            alt='deuxième inputBox'
            />
        </li>
        <li>
            <Image
            src={leResultat}
            width={300}
            alt='Resultat'
            />
        </li>
    </ul>
    <pre className={styles.MacroPre} >
        <code  >
            {codeVBA}
        </code>
    </pre>
    </div>
  )
}

