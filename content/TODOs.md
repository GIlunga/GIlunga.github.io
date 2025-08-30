---
publish: "false"
---
```dataview
LIST WITHOUT ID link
FROM ""
FLATTEN file.outlinks AS link
WHERE !link.file AND !contains(link, ".png") AND !contains(link, ".jpg") AND !contains(link, ".jpeg") AND !startswith(link.path, "Files/")
GROUP BY link

```
