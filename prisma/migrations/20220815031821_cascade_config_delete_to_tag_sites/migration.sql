-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Site" (
    "reference_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("reference_id", "name"),
    CONSTRAINT "Site_reference_id_fkey" FOREIGN KEY ("reference_id") REFERENCES "BooruConfig" ("reference_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Site" ("name", "reference_id") SELECT "name", "reference_id" FROM "Site";
DROP TABLE "Site";
ALTER TABLE "new_Site" RENAME TO "Site";
CREATE TABLE "new_Tag" (
    "reference_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("reference_id", "name"),
    CONSTRAINT "Tag_reference_id_fkey" FOREIGN KEY ("reference_id") REFERENCES "BooruConfig" ("reference_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("name", "reference_id") SELECT "name", "reference_id" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
