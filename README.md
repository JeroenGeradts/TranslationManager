# TranslationManager
Apply edits from previous version to a new language file of Kaltura Media Space (KMS)

This script will apply edits from a previous language file (default.po) of KMS to a new version.
When upgrading KMS previous edits are lost, so you have to re-edit all 20.000 lines again which takes about 40 hours of painstaking editing.

This script compares all lines in the language file you've edited before with the new language file.
If the English system message is the same, the script will replace the translation in the new file for the translation in the old file.
If the English system message is different, the script will insert a marking "@@@new translation" to the new language file.

These markings will help you to identify the new lines and edit those manually.
Don't forget to remove all markings "@@@new translation" before transcoding the default.po file to default.mo and put it in production.

Start the script by opening TranslationManager.html in your browser and follow the steps:
1. Insert the old language file default.po
2. Insert the new language file
3. Download the revised new language file

Next you can edit manually all messages indicated with "@@@new translation".

In the subfolder public you will find all javascript.
In the subfolder input you will find the language files of KMS 5.100.29 and 5.106.29
In the subfolder output you will find the generated language file and the manually edited language file

My edits are to Dutch messages, but the script should work for other languages and other versions of KMS too.
For bugfixing purposes activate line 88 in public/capture.js.
When you run the script it will generate an extra file translation.js that contains the arrays that are used to compare the old and the new lines in the language file.
