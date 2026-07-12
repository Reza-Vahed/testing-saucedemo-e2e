# Testplan: SauceDemo E2E Testautomatisierung

## Übersicht

| | |
|---|---|
| **Projekt** | SauceDemo E2E Testautomatisierung |
| **Zielwebsite** | https://www.saucedemo.com |
| **Umfang** | Login (positiv/negativ/Grenzfall), Produktkatalog, Warenkorb, Checkout-Prozess |
| **Explizit ausgeschlossen** | Echte Zahlungsabwicklung, Performance-Tests, Mobile-Ansicht |
| **Zeitraum** | Woche 4 (Sprint 1) |
| **Verantwortlich** | Hamid |
| **Testfälle** | 9, alle automatisiert mit Playwright |
| **Risiken/Annahmen** | SauceDemo-Testnutzer und -Struktur bleiben während der Projektlaufzeit stabil |

Zugehöriges Jira-Epic: **SauceDemo E2E Testautomatisierung** (Projekt SCRUM)

---

## Testfälle im Detail

### SCRUM-1: Login – Erfolgreicher Login mit standard_user
```
Vorbedingung: Login-Seite (saucedemo.com) ist geöffnet
Schritte: 1. Username "standard_user" eingeben 2. Passwort "secret_sauce" eingeben 3. "Login" klicken
Erwartetes Ergebnis: Nutzer landet auf der Produktübersicht (URL enthält "inventory.html")
Status: ✅ Erledigt
```

### SCRUM-2: Login – Negativfall (gesperrter Nutzer)
```
Vorbedingung: Login-Seite ist geöffnet
Schritte: 1. Username "locked_out_user" eingeben 2. Passwort "secret_sauce" eingeben 3. "Login" klicken
Erwartetes Ergebnis: Fehlermeldung "Epic sadface: Sorry, this user has been locked out." wird angezeigt, Nutzer bleibt auf Login-Seite
Status: Offen
```

### SCRUM-3: Login – Grenzfall (leere Felder)
```
Vorbedingung: Login-Seite ist geöffnet
Schritte: 1. Beide Felder leer lassen 2. "Login" klicken
Erwartetes Ergebnis: Fehlermeldung "Epic sadface: Username is required" wird angezeigt
Status: Offen
```

### SCRUM-4: Produktkatalog – Artikel sichtbar
```
Vorbedingung: Nutzer ist eingeloggt (standard_user)
Schritte: 1. Produktübersicht ansehen
Erwartetes Ergebnis: 6 Produkte sind sichtbar, jedes mit Name, Preis und "Add to cart"-Button
Status: Offen
```

### SCRUM-5: Warenkorb – Artikel hinzufügen
```
Vorbedingung: Nutzer ist eingeloggt, befindet sich auf Produktübersicht
Schritte: 1. "Add to cart" bei einem Artikel klicken
Erwartetes Ergebnis: Warenkorb-Icon zeigt "1" an, Button ändert sich zu "Remove"
Status: Offen
```

### SCRUM-6: Warenkorb – Artikel entfernen
```
Vorbedingung: Nutzer hat bereits einen Artikel im Warenkorb
Schritte: 1. "Remove" beim Artikel klicken
Erwartetes Ergebnis: Warenkorb-Icon zeigt keine Zahl mehr / Zähler auf 0
Status: Offen
```

### SCRUM-7: Checkout – Vollständiger Kaufprozess
```
Vorbedingung: Nutzer ist eingeloggt, hat mind. 1 Artikel im Warenkorb
Schritte: 1. Warenkorb öffnen 2. "Checkout" klicken 3. Vorname/Nachname/PLZ eingeben 4. "Continue" 5. "Finish" klicken
Erwartetes Ergebnis: Bestätigungsseite mit "Thank you for your order!" wird angezeigt
Status: Offen
```

### SCRUM-8: Checkout – Grenzfall (Pflichtfelder leer)
```
Vorbedingung: Nutzer ist im Checkout-Formular
Schritte: 1. Alle Felder leer lassen 2. "Continue" klicken
Erwartetes Ergebnis: Fehlermeldung "Error: First Name is required" wird angezeigt
Status: Offen
```

### SCRUM-9: Navigation – Warenkorb-Icon führt zur Warenkorbseite
```
Vorbedingung: Nutzer ist eingeloggt
Schritte: 1. Auf das Warenkorb-Icon klicken
Erwartetes Ergebnis: URL wechselt zu "cart.html", Warenkorbseite wird angezeigt
Status: Offen
```

---

## Priorisierung

1. **Kritisch** (zuerst umsetzen): SCRUM-1, SCRUM-2, SCRUM-7 – Login und Checkout sind die geschäftskritischen Flows
2. **Hoch**: SCRUM-4, SCRUM-5, SCRUM-6 – Produktkatalog und Warenkorb
3. **Mittel**: SCRUM-3, SCRUM-8 – Grenzfälle/Validierung
4. **Niedrig**: SCRUM-9 – Navigation, einfacher Check

## Testumgebung

- **Browser:** Chromium, Firefox, WebKit (automatisch via Playwright-Konfiguration)
- **Testdaten:** Öffentlich verfügbare SauceDemo-Testnutzer (standard_user, locked_out_user), Passwort: secret_sauce
- **Keine Testdatenbank-Verwaltung nötig**, da SauceDemo eine statische Demo-Anwendung ohne persistente Datenänderung ist
