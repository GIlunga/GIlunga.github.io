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


- improve old paper formats
- add github links
- Authors should be searchable!! What about et.al. - maybe add them as properties?