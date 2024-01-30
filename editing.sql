use tf2;


select * from main;
select * from classes_played;
select * from type_of_cheats;
select * from communications;
select * from account_info;
select * from game_behavior;
select * from notes;
select * from profile_info;


set @profileURL = 'https://steamcommunity.com/id/TROSTR/';
select * from main where profile_url = @profileURL;
select * from classes_played where profile_url = @profileURL;
select * from type_of_cheats where profile_url = @profileURL;
select * from communications where profile_url = @profileURL;
select * from account_info where profile_url = @profileURL;
select * from game_behavior where profile_url = @profileURL;
select * from notes where profile_url = @profileURL;
select * from profile_info where profile_url = @profileURL;