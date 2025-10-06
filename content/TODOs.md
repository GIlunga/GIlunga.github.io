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


- Paper year visible on the page itself and searchable
- add stubs for existing refs
- add missing concepts
- improve old paper formats
- add github links
- Links to companies, when available?
- Authors should be searchable!! What about et.al. - maybe add them as properties? Ideally they could be a part of the graph too, so you could just find people and get all of their papers