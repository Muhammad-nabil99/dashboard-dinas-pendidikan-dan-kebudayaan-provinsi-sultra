# Fix Agenda Delete Issue

## Problem
User cannot delete agenda items due to route model binding mismatch and field inconsistencies.

## Root Causes
1. Route parameters use `{agendaId}` but controller methods expect `Agenda $agenda` (binding fails).
2. Controller destroy method references `$agenda->file` but model uses `coverImage` field.
3. Update method has inconsistencies with file handling.

## Plan
- [x] Update routes/web.php: Change `{agendaId}` to `{agenda}` in agenda routes for proper model binding.
- [x] Update AgendaController.php destroy method: Change `$agenda->file` to `$agenda->coverImage`.
- [x] Update AgendaController.php update method: Fix file handling to use `coverImage` consistently.
- [ ] Test delete functionality after fixes.

## Files to Edit
- routes/web.php
- app/Http/Controllers/AgendaController.php
