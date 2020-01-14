SELECT `user`.`id`, `user`.`email`, `user`.`nick`, `user`.`password`, `user`.`provider`, `user`.`snsId`, `user`.`createdAt`, `user`.`updatedAt`, `user`.`deletedAt`, 

`Followers`.`id` AS `Followers.id`, `Followers`.`nick` AS `Followers.nick`, 
`Followings`.`id` AS `Followings.id`, `Followings`.`n
ick` AS `Followings.nick`, 


`Followers->Follow`.`createdAt` AS `Followers.Follow.createdAt`, `Followers->Follow`.`updatedAt` AS `Followers.Follow.updatedAt`, 
`Followers->Follow`.`followingId` AS `Followers.Follow.followingId`, `Followers->Follow`.`followerId` AS `Followers.Follow.followerId`, 

`Followings->Follow`.`createdAt` AS `Followings.Follow.createdAt`, `Followings->Follow`.`updatedAt` AS `Followings.Follow.updatedAt`, 
`Followings->Follow`.`followingId` AS `Followings.Follow.followingId`, `Followings->Follow`.`followerId` AS `Followings.Follow.followerId` 

FROM `users` AS `user` 

LEFT OUTER JOIN ( `Follow` AS `Followers->Follow` INNER JOIN `users` AS `Followers` ON `Followers`.`id` = `Followers->Follow`.`followerId`) 
ON `user`.`id` = `Followers->Follow`.`followingId` AND (`Followers`.`deletedAt` IS NULL) 

LEFT OUTER JOIN ( `Follow` AS `Followings->Follow` INNER JOIN `users` AS `Followings` ON `Followings`.`id` = `Followings->Follow`.`followingId`) 
ON `user`.`id` = `Followings->Follow`.`followerId` AND (`Followings`.`deletedAt` IS NULL) 


WHERE (`user`.`deletedAt` IS NULL AND `user`.`id` = 7);



SELECT `post`.`id`, `post`.`content`, `post`.`img`, `post`.`createdAt`, `post`.`updatedAt`, `post`.`deletedAt`, `post`.`userId`, 
`user`.`id` AS `user.id`, `user`.`email` AS `user.email`, `user`.`nick` AS `user.nick`, `user`.`password` AS `user.password`, `user`.`provider` AS `user.provider`, `user`.`snsId` AS `user.snsId`, `user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt`, `user`.`deletedAt` AS `user.deletedAt`, 
`PostHashtag`.`createdAt` AS `PostHashtag.createdAt`, `PostHashtag`.`updatedAt` AS `PostHashtag.updatedAt`, `PostHashtag`.`postId` AS `PostHashtag.postId`, `PostHashtag`.`hashtagId` AS `PostHashtag.hashtagId` 
FROM `posts` AS `post` LEFT OUTER JOIN `users` AS `user` 
ON `post`.`userId` = `user`.`id` AND (`user`.`deletedAt` IS NULL) INNER JOIN `PostHashtag` AS `PostHashtag` ON `post`.`id` = `PostHashtag`.`postId` AND `PostHashtag`.`hashtagId` = 2 WHERE (`post`.`deletedAt` IS NULL);











SELECT `user`.`id`, `user`.`email`, `user`.`nick`, `user`.`password`, `user`.`provider`, `user`.`snsId`, `user`.`createdAt`,
 `user`.`updatedAt`, `user`.`deletedAt`, `Followers`.`id` AS `Followers.id`, `Followers`.`nick` AS `Followers.nick`, 
 `Followers->Follow`.`createdAt` AS `Followers.Follow.createdAt`, `Followers->Follow`.`updatedAt` AS `Followers.Follow.updatedAt`, 
 `Followers->Follow`.`followingId` AS `Followers.Follow.followingId`, `Followers->Follow`.`followerId` AS `Followers.Follow.followerId`,
 `Followings`.`id` AS `Followings.id`, `Followings`.`nick` AS `Followings.nick`, `Followings->Follow`.`createdAt` AS `Followings.Follow.createdAt`, `Followings->Follow`.`updatedAt` AS `Followings.Follow.updatedAt`, `Followings->Follow`.`followingId` AS `Followings.Follow.followingId`, `Followings->Follow`.`followerId` AS `Followings.Follow.followerId` 
 
 FROM `users` AS `user` 
 
LEFT OUTER JOIN ( `Follow` AS `Followers->Follow` INNER JOIN `users` AS `Followers` ON `Followers`.`id` = `Followers->Follow`.`followerId`) 
ON `user`.`id` = `Followers->Follow`.`followingId` AND (`Followers`.`deletedAt` IS NULL) 

LEFT OUTER JOIN ( `Follow` AS `Followings->Follow` INNER JOIN `users` AS `Followings` ON `Followings`.`id` = `Followings->Follow`.`followingId`) 
ON `user`.`id` = `Followings->Follow`.`followerId` AND (`Followings`.`deletedAt` IS NULL) WHERE (`user`.`deletedAt` IS NULL AND `user`.`id` = 2);




SELECT `user`.`id`, `user`.`email`, `user`.`nick`, `user`.`password`, `user`.`provider`, `user`.`snsId`, `user`.`createdAt`, `user`.`updatedAt`, `user`.`deletedAt`, `Followers`.`id` AS `Followers.id`, `Followers`.`nick` AS `Followers.nick`, `Followers->Follow`.`createdAt` AS `Followers.Follow.createdAt`, `Followers->Follow`.`updatedAt` AS `Followers.Follow.updatedAt`, `Followers->Follow`.`followingId` AS `Followers.Follow.followingId`, `Followers->Follow`.`followerId` AS `Followers.Follow.followerId` 
FROM `users` AS `user` 

LEFT OUTER JOIN ( `Follow` AS `Followers->Follow` INNER JOIN `users` AS `Followers` ON `Followers`.`id` = `Followers->Follow`.`followerId`) 
ON `user`.`id` = `Followers->Follow`.`followingId` AND (`Followers`.`deletedAt` IS NULL) WHERE (`user`.`deletedAt` IS NULL AND `user`.`id` = 2);