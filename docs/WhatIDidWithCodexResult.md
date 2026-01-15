1. Wklejony Prompt nr 1
2. Wybrane repo, branch, 4 wersje.
3. Codex pracuje
4. Wygenerowaną wersję 1 wklejam do repo:
    - w prawym górnym rogu opcja "kopiuj git apply" - kopiuje cały diff
    - w projekcie lokalnym tworzę plik "codex.patch" i wklejam to co skopiowało się z codex'a
    - w terminalu "git apply codex.patch"
5. Odpalam install i run.
6. Naprawa błędów ( w tym przypadku konfiguracyjne i paczki )
7. Apka dziala-ish. ( błędy podczas niektorych akcji )
<img width="1870" height="1049" alt="image" src="https://gist.github.com/user-attachments/assets/4b2c6f18-c18c-4a6c-9f88-ae3e357fb216" />
<img width="1870" height="1049" alt="image" src="https://gist.github.com/user-attachments/assets/34e0274e-778a-418e-96f4-ab014f80d5ed" />
8. Komituję na branchu codex-v1.
9. Wklejam do repo wersję 2.
10. Install, run, brak błędów.
11. Apka działa.
<img width="1870" height="1049" alt="image" src="https://gist.github.com/user-attachments/assets/21f2aba0-a6c1-48f9-926a-3b3c3a36ece9" />
<img width="1870" height="1049" alt="image" src="https://gist.github.com/user-attachments/assets/838a1fde-d698-470f-8aab-db3de8c9cdb1" />
12. Komituję na branchu codex-v2.

13. Wersja 3 odrzucona - zdecydowanie gorsza od v2.

14. Wersja 4 odrzucona - zdecydowanie gorsza od v2 i obagowana na starcie.

15. Wybieram weersję 2:
- mniej kolorow do zmian
- lepszy layout
- z wersji 1 wezmę nawigację - podoba mi sie układ