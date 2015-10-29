var KiiAdapter = function() {

	/*
	 *  Initialize Kii Adapter
	 */
	this.initialize = function() {
		var deferred = $.Deferred();
		deferred.resolve();
		return deferred.promise();
	}
	
	
	/*
	 * Subscribe a Kii Bucket. 
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-app/
	 */
	this.subscribeKiiBucket = function(bucketName, user) {
		// var user = KiiUser.getCurrentUser();
		if (user != null) {
			var bucket = user.bucketWithName(bucketName);
			user.pushSubscription().subscribe(bucket, {
				success: function(bucket) {
					// Succeeded.
					console.log("Subscribe bucket (name: " + bucketName + ") Succeeded.");
				},
				failure: function(bucket, error) {
					// Handle error.
					console.log("Error happen when subscribe bucket (name: " + bucketName + "). Error info: " + error );
				}
			});
		} else {
			console.error("User is null !");
		}
	}


	/*
	 * Check if Subscribed to a Kii Bucket
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-app/
	 */
	this.isSubscribedKiiBucket = function(bucketName, user) {
		// var user = KiiUser.getCurrentUser();
		if (user != null) {
			var bucket = user.bucketWithName(bucketName);
			user.pushSubscription().isSubscribed(bucket, {
				success: function(bucket, isSubscribed) {
					// Succeeded.
					if (isSubscribed) {
						// The bucket is subscribed by current user.
						console.info("The bucket (name: " + bucketName + ")  is subscribed by current user.");
					} else {
						// The bucket is not subscribed by current user.
						console.info("The bucket (name: " + bucketName + ")  is NOT subscribed by current user.");
					}
				},
				failure: function(bucket, error) {
					// Handle error.
					console.error("Error happen when subscribe bucket (name: " + bucketName + "). Error info: " + error );
				}
			});
		} else {
			console.error("User is null !");
		}
	}


	/*
	 * Unsubscribe a Kii Bucket
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-app/
	 */
	this.unsubscribeKiiBucket = function(bucketName, user) {
		// var user = KiiUser.getCurrentUser();
		if (user != null) {
			var bucket = user.bucketWithName(bucketName);
			user.pushSubscription().unsubscribe(bucket, {
				success: function(bucket) {
					// Succeeded.
					console.log("Unsubscribe bucket (name: " + bucketName + ") Succeeded.");
				},
				failure: function(bucket, error) {
					// Handle error.
					console.error("Error happen when unsubscribe bucket (name: " + bucketName + "). Error info: " + error );
				}
			});
		} else {
			console.error("User is null !");
		}
	}
 

	

	/*
	 * Check if the current user is already subscribed to a topic
	 */
	this.isSubscribedUserScopeTopic = function(topicName) {
		var deferred = $.Deferred();
		var displayedMeg = "isSubscribedUserScopeTopic(): ";
		var topic = Kii.topicWithName(topicName);
		if (topic != null) {	
			var user = KiiUser.getCurrentUser();
			if (user != null) {				
				var isSubscribed = false;
				user.pushSubscription().isSubscribed(topic, {
					success: function(topic, isSubscribed) {
						// Succeeded.
						if (isSubscribed) {
							// The topic is subscribed by current user.
							displayedMeg += "The topic " + topicName + " is subscribed by current user.";
							console.info(displayedMeg);
							isSubscribed = true;
							deferred.resolve(isSubscribed);
						} else {
							// The topic is not subscribed by current user.
							displayedMeg += "The topic " + topicName + " is NOT subscribed by current user.";
							console.info(displayedMeg);
							deferred.resolve(isSubscribed);							
						}
					},
					failure: function(topic, error) {
						// Handle error.
						displayedMeg += "  Handle error !!  Error";
						console.error(displayedMeg);
						deferred.resolve(null);
					}
				});
			} else {
				displayedMeg += " User is null";
				console.error(displayedMeg)
				alert(displayedMeg);
				deferred.resolve(null);
			}
		} else {
			console.error("The topic '" + topicName + "' is null ==> cannot check if current logged User is already subscribed to that topic :(");
				deferred.resolve(null);
		}

		return deferred.promise();
	}

	/*	 
	 * Subscribe Kii bucket for Application scope
	 * Refer:  http://documentation.kii.com/en/guides/javascript/managing-push-notification/push-to-app/
	 */
	function subscribeKiiBucketForAppScope(appBucket) {
		var displayedMeg = "subscribeKiiBucketForAppScope(): ";
		var user = KiiUser.getCurrentUser();
		if (user != null) {
			var bucket = user.bucketWithName(appBucket);
			user.pushSubscription().subscribe(bucket, {
				success: function(bucket) {
					// Succeeded.
					displayedMeg = "subscribe App KiiBucket: " + appBucket + " Succeeded"
					console.log(displayedMeg);
				},
				failure: function(bucket, error) {
					// Handle error.
					displayedMeg = "subscribe App KiiBucket: " + appBucket + " failure !"
					console.error(displayedMeg);
					alert(displayedMeg);
				}
			});
		} else {
			displayedMeg += " user is null !";
			console.error(displayedMeg)
			alert(displayedMeg);
		}
	}


	/*
	 *	Subscribing application-scope topic
	 */
	this.subscribeApplicationScopeTopic = function(topicName) {
		// Instantiate the already-existing app-scope topic
		var displayedMeg = "subscribeApplicationScopeTopic(): Subscribing to a topic: " + topicName;
		var topic = Kii.topicWithName(topicName);
		if (topic != null) {
			// Subscribe the current user to the topic.
			var user = KiiUser.getCurrentUser();
			if (user != null) {
				user.pushSubscription().subscribe(topic, {
					success: function(pushSubscription) {
						// Succeeded.
						displayedMeg += " Succeeded !";
						console.log(displayedMeg);
					},
					failure: function(pushSubscription, error) {
						// Subscribe failed.
						displayedMeg += " Subscribe failed. !!";
						console.error(displayedMeg);
						alert(displayedMeg);
					}
				});
			} else {
				displayedMeg += " user is null !";
				console.error(displayedMeg)
				alert(displayedMeg);
			}
		} else {
			displayedMeg += topicName + " is null/not existed !";
			console.error(displayedMeg)
			alert(displayedMeg);
		}
	}


	/*
	 * subscribing a user-scope topic 
	 */
	this.subscribeUserScopeTopic = function(topicName) {
		var displayedMeg = "subscribeUserScopeTopic(): Subscribing to a topic: " + topicName;
		var topic = KiiUser.getCurrentUser().topicWithName();

		// Subscribe the current user to the topic.
		var user = KiiUser.getCurrentUser();
		if (user != null) {
			user.pushSubscription().subscribe(topic, {
				success: function(pushSubscription) {
					// Succeeded.
					displayedMeg += " Succeeded !";
					console.log(displayedMeg);
				},
				failure: function(pushSubscription, error) {
					// Subscribe failed.
					displayedMeg += " Subscribe failed. !!";
					console.error(displayedMeg);
					alert(displayedMeg);
				}
			});
		} else {
			displayedMeg += " user is null !";
			console.error(displayedMeg)
			alert(displayedMeg);
		}
	}


	/*
	 * Unsubscribing from a topic
	 */
	this.unsubscribeTopic = function(topic) {
		// Assume that the current user is subscribing to the topic. (and the target topic is already instantiated)
		var displayedMeg = "unsubscribeTopic(): ";
		var user = KiiUser.getCurrentUser();
		if (user != null && topic != null) {
			user.pushSubscription().unsubscribe(topic, {
				success: function(pushSubscription) {
					// Succeeded.
					displayedMeg += " Succeeded !";
					console.log(displayedMeg);
				},
				failure: function(pushSubscription, error) {
					// Unsubscribe failed
					displayedMeg += " Unsubscribe failed. !!";
					console.error(displayedMeg);
					alert(displayedMeg);
				}
			});
		} else {
			displayedMeg += " user or topic is null !";
			console.error(displayedMeg)
			alert(displayedMeg);
		}
	}


	/*
	 *	subscribing an group-scope topic
	 */
	this.subscribeGroupScopeTopic = function(topicName) {
		// Instantiate the already-existing group.
		var displayedMeg = "subscribeGroupScopeTopic(): Subscribing to a topic: " + topicName;
		var group = KiiGroup.groupWithURI(groupUri);
		if (group != null) {
			// Instantiate the group-scope topic.
			var topic = group.topicWithName(topicName);
			if (topic != null) {
				// Subscribe the current user to the topic.
				// (The current user must be a group member)
				var user = KiiUser.getCurrentUser();
				user.pushSubscription().subscribe(topic, {
					success: function(pushSubscription) {
						// Succeeded.
						displayedMeg += " Succeeded !";
						console.log(displayedMeg);
					},
					failure: function(pushSubscription, error) {
						// Subscribe failed
						displayedMeg += " Subscribe failed. !!";
						console.error(displayedMeg);
						alert(displayedMeg);
					}
				});
			} else {
				displayedMeg += topicName + " is null !";
				console.error(displayedMeg)
				alert(displayedMeg);
			}
		} else {
			displayedMeg += " group is null/not existed !";
			console.error(displayedMeg)
			alert(displayedMeg);
		}
	}

	/*
	 * Creating a Group-scope Topic.
	 * Refer: http://documentation.kii.com/en/guides/javascript/managing-push-notification/push-to-user/creating-topic/
	 */
	this.createGroupScopeTopic = function(groupName, groupTopicName) {
		var displayedMeg = "createGroupScopeTopic(): create Topic " + groupTopicName + " for Group : " + groupName;
		var group = Kii.groupWithName(groupName);
		if (group != null) {
			group.save({
				success: function(theGroup) {
					var topic = group.topicWithName(groupTopicName);
					topic.save({
						success: function(theTopic) {
							// Succeeded.
							displayedMeg += " Succeeded"
							console.log(displayedMeg);
						},
						failure: function(theTopic, error) {
							// Save topic failed.
							displayedMeg += " failure !";
							console.error(displayedMeg);
							alert(displayedMeg);
						}
					});
				},
				failure: function(theGroup, error) {
					// Save group failed.
					displayedMeg = "createGroupScopeTopic(): Save group failed.";
					console.error(displayedMeg);
					alert(displayedMeg);
				}
			});
		} else {
			displayedMeg += groupName + " - group is null !";
			console.error(displayedMeg)
			alert(displayedMeg);
		}
	}

	/*
	 *  Creating an Application-scope Topic
	 *  Refer: http://documentation.kii.com/en/guides/javascript/managing-push-notification/push-to-user/creating-topic/
	 */
	this.createApplicationScopeTopic = function(clientid, clientsecret, topicName) {		
		var displayedMeg = "Create Topic " + topicName + " for Application scope: ";
		Kii.authenticateAsAppAdmin(clientid, clientsecret, {
			success: function(adminContext) {
				var topic = adminContext.topicWithName(topicName);
				topic.save({
					success: function(theTopic) {
						// Succeeded.
						displayedMeg += " Succeeded :)"
						console.log(displayedMeg);
					},
					failure: function(theTopic, error) {
						// Save topic failed.
						displayedMeg = "Save '" + topicName + "' Application topic failed :(";
						console.error(displayedMeg);
						alert(displayedMeg);
					}
				});
			},
			failure: function(errorString, errorCode) {
				// auth failed.
				displayedMeg = ": Auth failed :(";
				console.error(displayedMeg);
				alert(displayedMeg);
			}
		});
	}

	/*
	 * Creating a Group-scope Topic.
	 * Refer: http://documentation.kii.com/en/guides/javascript/managing-push-notification/push-to-user/creating-topic/
	 */
	this.createUserScopeTopic = function(topicName) {
		var displayedMeg = "createUserScopeTopic(): ";
		var user = KiiUser.getCurrentUser();
		if (user != null) {
			// Creat a user-scope topic
			var topic = user.topicWithName(topicName);

			// Save the topic to Kii Cloud
			topic.save({
				success: function(theTopic) {
					// Succeeded.
					displayedMeg += " Succeeded"
					console.log(displayedMeg);
				},
				failure: function(theTopic, error) {
					// Save topic failed.
					displayedMeg += " Save topic failed."
					console.error(displayedMeg);
					alert(displayedMeg);
				}
			});
		} else {
			displayedMeg += "user is null !";
			console.error(displayedMeg)
			alert(displayedMeg);
		}
	}


	/*
	 * Delete a topic	 
	 */
	this.deleteTopic = function(topic) {
		var displayedMeg = "deleteTopic(): ";
		// Assume that "topic" is already instantiated.
		if (topic != null) {
			topic.delete({
				success: function(theTopic) {
					// Succeeded.
					displayedMeg += " Delete topic Succeeded";
					console.log(displayedMeg);
				},
				failure: function(theTopic, error) {
					// Handle error.
					displayedMeg += " Delete topic failure";
					console.error(displayedMeg);
					alert(displayedMeg);
				}
			});
		} else {
			displayedMeg += " topic is null to delete !";
			console.error(displayedMeg)
			alert(displayedMeg);
		}
	}

	/*
	 * Check Topic Existence
	 */
	this.isTopicExisted = function(topicName) {
		var displayedMeg = "isTopicExisted(): ";
		var topic = Kii.topicWithName(topicName);
		topic.exists({
			success: function(existed) {
				if (existed) {
					// SendingAlert topic already exists.
					displayedMeg += topicName + " is exists";
					console.log(displayedMeg);
				} else {
					// SendingAlert topic does not exist.
					displayedMeg += topicName + " NOT is exists";
					console.log(displayedMeg);
				}
			},
			failure: function(errorString) {
				console.log("Error listing topics: " + errorString);
			}
		});
	}

	/* 
	 * Only the application administrator can send a push message to a application-scope topic.
	 *  Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-user/sending-messages/
	 */
	this.sendPushMessageForApplicationScope = function(clientid, clientsecret, topicName, messageContent) {
		// client-id and client-secret is for your application, can get from Kii Cloud Developer Portal
		var displayedMeg = "sendPushMessage(): ";
		Kii.authenticateAsAppAdmin(clientid, clientsecret,  {
			success: function(adminContext) {
				// Assume that "SendingAlert" topic is already instantiated.
				var topic = adminContext.topicWithName(topicName);
				var contents = {
					message: messageContent
				};
				var message = new KiiPushMessageBuilder(contents).build();
				topic.sendMessage(message, {
					success: function(theTopic) {
						// Succeeded.
						displayedMeg += topicName + " sent Succeeded !";
						console.log(displayedMeg);
					},
					failure: function(theTopic, error) {
						// Send message failed.
						displayedMeg += topicName + " is sent failed !!!";
						console.error(displayedMeg);
						alert(displayedMeg);
					}
				});

			},
			failure: function(errorString, errorCode) {
				// auth failed.
				displayedMeg += " auth failed !";
				console.error(displayedMeg);
				alert(displayedMeg);
			}
		});
	}

	/*
	 * Getting a List of Application Scope Topics.
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-user/listing-topic/
	 */	
	this.getApplicationScopeTopics = function() {
		Kii.listTopics({
			success: function(topicList, nextPaginationKey) {
				// do something with the result
				for (var i = 0; i < topicList.length; i++) {
					var topic = topicList[i];
					// do something with topic.
				}
				if (nextPaginationKey != null) {
					Kii.listTopics({
						success: function(topicList, nextPaginationKey) {
							// do something with topic.
						},
						failure: function(errorString) {
							console.log("Error listing topics: " + errorString);
						}
					}, nextPaginationKey);
				}
			},
			failure: function(errorString) {
				console.log("Error listing topics: " + errorString);
			}
		});
	}


	/*
	 * Getting a List of Group Scope Topics
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-user/listing-topic/
	 */
	this.getGroupScopeTopics = function(groupUri) {
		// Instantiate the group.
		// (Assume that groupUri has the reference URI of the target group).
		var group = new KiiGroup.groupWithURI(groupUri);
		group.listTopics({
			success: function(topicList, nextPaginationKey) {
				// do something with the result
				for (var i = 0; i < topicList.length; i++) {
					var topic = topicList[i];
					// do something with topic.
				}
				if (nextPaginationKey != null) {
					group.listTopics({
						success: function(topicList, nextPaginationKey) {
							// do something with topic.
						},
						failure: function(errorString) {
							console.log("Error listing topics: " + errorString);
						}
					}, nextPaginationKey);
				}
			},
			failure: function(errorString) {
				console.log("Error listing topics: " + errorString);
			}
		});
	}


	/*
	 * Getting a List of User Scope Topics
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-user/listing-topic/
	 */
	this.getUserScopeTopics = function() {
		var user = KiiUser.getCurrentUser();
		if (user != null) {
			user.listTopics({
				success: function(topicList, nextPaginationKey) {
					// do something with the result
					for (var i = 0; i < topicList.length; i++) {
						var topic = topicList[i];
						// do something with topic.
					}
					if (nextPaginationKey != null) {
						user.listTopics({
							success: function(topicList, nextPaginationKey) {
								// do something with topic.
							},
							failure: function(errorString) {
								console.log("Error listing topics: " + errorString);
							}
						}, nextPaginationKey);
					}
				},
				failure: function(errorString) {
					console.log("Error listing topics: " + errorString);
				}

			});
		} else {
			console.error("User is null :( !");
		}
	}

	/*
	 * Check Subscription Status: You might want to check	if the current user is already subscribed to a topic.For example, your application may want to show a "SUBSCRIBE"
	 * button for users who have not yet subscribed to a topic and an "UNSUBSCRIBE" button instead for those users who are already subscribed to the topic.
	 * 
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-user/checking-subscription/
	 */
	this.checkSubscriptionStatus = function(topicName) {
		var topic = Kii.topicWithName(topicName);
		if (topic != null) {
			// Check if the current user is already subscribing to the topic.
			var user = KiiUser.getCurrentUser();
			if (user != null) {
				user.pushSubscription().isSubscribed(topic, {
					success: function(topic, isSubscribed) {
						// Succeeded.
						if (isSubscribed) {
							// The topic is subscribed by current user.

						} else {
							// The topic is not subscribed by current user.

						}
					},
					failure: function(topic, error) {
						// Handle error.
					}
				});
			} else {
				console.error("User is null !");
			}
		} else {
			console.error("Topic '" + topicName + "' is null !");
		}
	}


	/*
	 * For a group-scope topic, any group member can send a push message to it.
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-user/sending-messages/
	 */
	this.sendMessageForGroupScope = function(groupURI, topicName, contents) {
		var group = KiiGroup.groupWithURI(groupURI);
		if (group != null) {
			var topic = group.topicWithName(topicName);
			if (topic != null) {

				// Build a push message.
				var message = new KiiPushMessageBuilder(contents).build();
				topic.sendMessage(message, {
					success: function(theTopic) {
						// Succeeded.
					},
					failure: function(theTopic, error) {
						// Send message failed.
					}
				});
			} else {
				console.error("Topic '" + topicName + "' is null :( !");
			}
		} else {
			console.error("The Group is null !");
		}
	}


	/*
	 * For a user-scope topic, only the user who owns the topic can send a push message to it.
	 * Refer: http://docs.kii.com/en/guides/javascript/managing-push-notification/push-to-user/sending-messages/
	 */
	this.sendMessageForUserScope = function(topicName, contents) {
		var user = KiiUser.getCurrentUser();
		if (user != null) {
			var topic = user.topicWithName(topicName);
			if (topic != null) {
				// Build a push message.
				var message = new KiiPushMessageBuilder(contents).build();
				topic.sendMessage(message, {
					success: function(theTopic) {
						// Succeeded.
					},
					failure: function(theTopic, error) {
						// Send message failed.
					}
				});
			} else {
				console.error("Topic '" + topicName + "' is null :(");
			}
		} else {
			console.error("User is null :( !");
		}

	}

	
}
