/* Percent of cheaters that disable their comment section */
SELECT 
    CONCAT(ROUND((SELECT COUNT(*) FROM profile_info WHERE disables_comments = TRUE)
    / 
    (SELECT COUNT(*) FROM main) * 100, 0), '%') AS 'Percentage of cheaters with disabled comments';

/* Percent of cheaters who lost their game */
SELECT 
    CONCAT(ROUND((SELECT COUNT(*) FROM profile_info WHERE disables_comments = TRUE)
    / 
    (SELECT COUNT(*) FROM main) * 100, 0), '%') AS 'Percentage of cheaters with disabled comments';

/* Percent of cheaters with unusuals */
SELECT 
    CONCAT(ROUND((SELECT COUNT(*) FROM profile_info WHERE has_unusuals = TRUE) 
    / 
    (SELECT COUNT(*) FROM main) * 100, 0), '%') AS 'Percentage of cheaters with unusuals';

/* Percent of cheaters with australiums */
SELECT 
    CONCAT(ROUND((SELECT COUNT(*) FROM profile_info WHERE has_australiums = TRUE)
    / 
    (SELECT COUNT(*) FROM main) * 100, 0), '%') AS 'Percentage of cheaters with Australiums';
