# Teststrategie: SauceDemo E2E Testautomatisierung

## Zweck

Diese Teststrategie definiert die grundsätzlichen Prinzipien und den Ansatz für die Testautomatisierung dieses Portfolio-Projekts. Sie gilt übergeordnet für das gesamte Projekt und ändert sich nicht mit jedem einzelnen Testfall (im Gegensatz zum Testplan, siehe `testplan.md`).

## Testarten-Verteilung

Dieses Projekt fokussiert sich bewusst auf **End-to-End-Tests (E2E)**, da:

- Playwright primär für E2E-Testautomatisierung eingesetzt wird
- Der Fokus des Portfolios auf UI-Testautomatisierung liegt, nicht auf Unit- oder Integrationstests (die typischerweise vom Entwicklungsteam der zu testenden Anwendung geschrieben werden)

| Testebene        | Anteil in diesem Projekt   |
| ---------------- | -------------------------- |
| E2E (Playwright) | 100%                       |
| Integration      | nicht Teil dieses Projekts |
| Unit             | nicht Teil dieses Projekts |

## Automatisierungsgrad

**Ziel: 100% Automatisierung** der definierten Testfälle (siehe `testplan.md`), da:

- Alle Testfälle wiederholbar, stabil und klar prüfbar sind (siehe Woche 2/3 Lernnotizen zu "Was ist automatisierbar")
- Kein Bedarf an explorativem manuellen Testen für dieses abgegrenzte Demo-Projekt

## Eingesetzte Tools

| Tool           | Zweck                                                       |
| -------------- | ----------------------------------------------------------- |
| Playwright     | Test-Framework, Browserautomatisierung                      |
| TypeScript     | Programmiersprache, Typsicherheit                           |
| GitHub Actions | CI/CD-Pipeline (automatische Testausführung bei jedem Push) |
| Jira           | Aufgabenverwaltung, Sprint-Organisation (Scrum)             |

## Browser-Abdeckung

Tests laufen automatisch in drei Engines:

- Chromium
- Firefox
- WebKit (Safari-Engine)

Dies stellt Cross-Browser-Kompatibilität sicher, ohne zusätzlichen manuellen Aufwand.

## Qualitätsziele

- Alle definierten Testfälle im Testplan müssen automatisiert und grün sein, bevor das Projekt als "fertig" gilt
- Jeder Testfall folgt dem Best-Practice-Muster: `getByRole()` als bevorzugter Selektor, `describe`/`beforeEach`-Struktur, keine hartcodierten Wartezeiten
- Tests müssen unabhängig voneinander lauffähig sein (keine Testreihenfolge-Abhängigkeiten)

## Nicht-funktionale Aspekte

**Bewusst außerhalb des Umfangs dieses Projekts:**

- Performance-/Lasttests
- Security-Testing
- Barrierefreiheits-Testing (Accessibility) im engeren Sinne, auch wenn `getByRole()` indirekt zur Barrierefreiheit beiträgt

Diese Einschränkung ist eine bewusste Entscheidung, um den Fokus des Portfolio-Projekts auf E2E-Funktionstests zu halten.

## Risikobasierter Ansatz

Kritische Nutzerflows (Login, Checkout) werden priorisiert vor Nice-to-have-Funktionen (siehe Testplan, Priorisierung der Testfälle).
