<!-- filled by /dsf:ia -->

# Flows

<!-- one Mermaid flow per main job. Every flow needs: decision diamonds,
     empty / error / loading states, and both a success and a failure ending. -->

## Flow — `[?]` (main job)

```mermaid
flowchart TD
  Start([Entry]) --> Load{Data loaded?}
  Load -- loading --> Loading[Loading state]
  Loading --> Load
  Load -- empty --> Empty[Empty state]
  Load -- error --> Error[Error state]
  Load -- yes --> Action{User can act?}
  Action -- yes --> Submit[Submit action]
  Action -- no --> Empty
  Submit --> Result{Success?}
  Result -- yes --> Success([Success ending])
  Result -- no --> Fail[Error state] --> End([Failure ending])
```

- Screens involved: `[?]`
- Source of the branching logic: `[?]`

## Flow — `[?]`

```mermaid
flowchart TD
  Start([Entry]) --> End([Ending])
```

## Coverage

<!-- every flow traces back to a job in ia/sitemap.md -->

| Flow | Job | Screens | States covered |
|---|---|---|---|
| `[?]` | | | empty · error · loading · success · failure |
