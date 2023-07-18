select * from tblStage order by makeday desc limit #{curr}, #{cpp};
스테이지 목록 기본형

SELECT ts.address, ts.title, ts.desc, ts.genre, ts.tag, ts.nick, ts.makeday, ts.img, CASE WHEN ts.pw IS NOT NULL THEN 1 ELSE NULL END AS pw, ts.maxlength, ts.skipratio
FROM tblStage ts
WHERE ts.nick NOT IN (
    SELECT tf.target
    FROM tblFollow tf
    WHERE tf.follow = '123'
)
AND ts.nick NOT IN (
    SELECT tb.target
    FROM tblBlack tb
    WHERE tb.black = '123'
) order by makeday desc limit 3,3;
-- 팔로우와 블랙리스트 제외 스테이지 목록


SELECT ts.address, ts.title, ts.desc, ts.genre, ts.tag, ts.nick, ts.makeday, ts.img, CASE WHEN ts.pw IS NOT NULL THEN 1 ELSE NULL END AS pw, ts.maxlength, ts.skipratio
FROM tblStage ts
WHERE ts.nick IN (
    SELECT tf.target
    FROM tblFollow tf
    WHERE tf.follow = '123'
) order by makeday desc;
-- 팔로우 스테이지 목록

