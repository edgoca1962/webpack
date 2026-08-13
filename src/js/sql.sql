-- ============================================================================
-- Buscar movimiento con todos los filtros 
-- ============================================================================
SELECT
   p.*,
   pm.meta_value AS monto,
   CASE
      WHEN p2.term_id IS NOT NULL THEN p2.term_id
      WHEN p1.term_id IS NOT NULL THEN p1.term_id
      ELSE tt.term_id
   END AS t_cat_id,
   CASE
      WHEN p2.term_id IS NOT NULL THEN p1.term_id
      WHEN p1.term_id IS NOT NULL THEN tt.term_id
      ELSE 0
   END AS cat_id,
   CASE
      WHEN p2.term_id IS NOT NULL THEN tt.term_id
      ELSE 0
   END AS scat_id,
   CASE
      WHEN p2.term_id IS NOT NULL THEN t2.name
      WHEN p1.term_id IS NOT NULL THEN t1.name
      ELSE t.name
   END AS t_cat,
   CASE
      WHEN p2.term_id IS NOT NULL THEN t1.name
      WHEN p1.term_id IS NOT NULL THEN t.name
      ELSE NULL
   END AS cat,
   CASE
      WHEN p2.term_id IS NOT NULL THEN t.name
      ELSE NULL
   END AS scat
FROM
   wp_posts p
   INNER JOIN wp_postmeta pm ON p.ID = pm.post_id
   AND pm.meta_key = '_monto'
   INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id
   INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
   AND tt.taxonomy = 'sgf_igt'
   INNER JOIN wp_terms t ON tt.term_id = t.term_id
   LEFT JOIN wp_term_taxonomy p1 ON tt.parent = p1.term_id
   AND p1.taxonomy = 'sgf_igt'
   LEFT JOIN wp_terms t1 ON p1.term_id = t1.term_id
   LEFT JOIN wp_term_taxonomy p2 ON p1.parent = p2.term_id
   AND p2.taxonomy = 'sgf_igt'
   LEFT JOIN wp_terms t2 ON p2.term_id = t2.term_id
WHERE
   1 = 1
   AND p.post_type = 'libro'
   AND p.post_status = 'publish'
   AND p.post_author = 1
   AND p.post_date BETWEEN '2025-07-01 00:00:00'
   AND '2026-07-31 23:59:59'
   AND pm.meta_key = '_monto'
   AND p.post_title LIKE '{dc10214156e6f697e0e4c51b2c88c603e7eba7ec09e29fe53ff08ed2c8510b9d}auto{dc10214156e6f697e0e4c51b2c88c603e7eba7ec09e29fe53ff08ed2c8510b9d}'
   AND ABS(pm.meta_value) BETWEEN 100000.000000
   AND 500000.000000
   AND (
      tt.term_id = 116
      OR p1.term_id = 116
      OR p2.term_id = 116
   )
   AND (
      tt.term_id = 121
      OR p1.term_id = 121
   )
   AND tt.term_id = 1426
ORDER BY
   p.post_date ASC
LIMIT
   100 OFFSET 0;

-- ============================================================================
-- Buscar movimiento no categoriazados con los otros filtros 
-- ============================================================================
SELECT
   p.*,
   pm.meta_value AS monto,
   CASE
      WHEN p2.term_id IS NOT NULL THEN p2.term_id
      WHEN p1.term_id IS NOT NULL THEN p1.term_id
      ELSE tt.term_id
   END AS t_cat_id,
   CASE
      WHEN p2.term_id IS NOT NULL THEN p1.term_id
      WHEN p1.term_id IS NOT NULL THEN tt.term_id
      ELSE 0
   END AS cat_id,
   CASE
      WHEN p2.term_id IS NOT NULL THEN tt.term_id
      ELSE 0
   END AS scat_id,
   CASE
      WHEN p2.term_id IS NOT NULL THEN t2.name
      WHEN p1.term_id IS NOT NULL THEN t1.name
      ELSE t.name
   END AS t_cat,
   CASE
      WHEN p2.term_id IS NOT NULL THEN t1.name
      WHEN p1.term_id IS NOT NULL THEN t.name
      ELSE NULL
   END AS cat,
   CASE
      WHEN p2.term_id IS NOT NULL THEN t.name
      ELSE NULL
   END AS scat
FROM
   wp_posts p
   INNER JOIN wp_postmeta pm ON p.ID = pm.post_id
   AND pm.meta_key = '_monto'
   INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id
   INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
   AND tt.taxonomy = 'sgf_igt'
   INNER JOIN wp_terms t ON tt.term_id = t.term_id
   LEFT JOIN wp_term_taxonomy p1 ON tt.parent = p1.term_id
   AND p1.taxonomy = 'sgf_igt'
   LEFT JOIN wp_terms t1 ON p1.term_id = t1.term_id
   LEFT JOIN wp_term_taxonomy p2 ON p1.parent = p2.term_id
   AND p2.taxonomy = 'sgf_igt'
   LEFT JOIN wp_terms t2 ON p2.term_id = t2.term_id
WHERE
   1 = 1
   AND p.post_type = 'libro'
   AND p.post_status = 'publish'
   AND p.post_author = 1
   AND p.post_date BETWEEN '2025-07-01 00:00:00'
   AND '2026-07-31 23:59:59'
   AND pm.meta_key = '_monto'
   AND p.post_title LIKE '{eefc50d262cb53aa307a3d5a5db3357dd71169cde809dceed19b3b2ffb680667}auto{eefc50d262cb53aa307a3d5a5db3357dd71169cde809dceed19b3b2ffb680667}'
   AND ABS(pm.meta_value) BETWEEN 100000.000000
   AND 500000.000000
   AND (
      NOT EXISTS (
         SELECT
            1
         FROM
            wp_term_relationships AS tr
            INNER JOIN wp_term_taxonomy AS tt ON tt.term_taxonomy_id = tr.term_taxonomy_id
         WHERE
            tt.taxonomy = 'sgf_igt'
            AND tr.object_id = p.ID
      )
   )
ORDER BY
   p.post_date ASC
LIMIT
   100 OFFSET 0;