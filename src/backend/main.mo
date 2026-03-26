import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import List "mo:core/List";
import Random "mo:core/Random";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Data Types
  public type Post = {
    title : Text;
    body : Text;
    author : Principal;
    category : Text;
    upvotes : Nat;
    createdAt : Time.Time;
  };

  module Post {
    public func compare(post1 : Post, post2 : Post) : Order.Order {
      Text.compare(post1.title, post2.title);
    };

    public func compareByUpvotes(post1 : Post, post2 : Post) : Order.Order {
      Nat.compare(post2.upvotes, post1.upvotes);
    };

    public func compareByCategory(post1 : Post, post2 : Post) : Order.Order {
      switch (Text.compare(post1.category, post2.category)) {
        case (#equal) { compare(post1, post2) };
        case (order) { order };
      };
    };
  };

  public type Goal = {
    title : Text;
    createdAt : Time.Time;
    progress : Nat;
    owner : Principal;
  };

  module Goal {
    public func compare(goal1 : Goal, goal2 : Goal) : Order.Order {
      Text.compare(goal1.title, goal2.title);
    };

    public func compareByProgress(goal1 : Goal, goal2 : Goal) : Order.Order {
      Nat.compare(goal2.progress, goal1.progress);
    };
  };

  public type Task = {
    title : Text;
    completed : Bool;
    owner : Principal;
  };

  module Task {
    public func compare(task1 : Task, task2 : Task) : Order.Order {
      Text.compare(task1.title, task2.title);
    };
  };

  public type BusinessIdea = {
    idea : Text;
    creator : Principal;
    createdAt : Time.Time;
  };

  module BusinessIdea {
    public func compare(idea1 : BusinessIdea, idea2 : BusinessIdea) : Order.Order {
      Text.compare(idea1.idea, idea2.idea);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  // State
  let posts = Map.empty<Nat, Post>();
  let goals = Map.empty<Principal, List.List<Goal>>();
  let tasks = Map.empty<Principal, List.List<Task>>();
  let businessIdeas = List.empty<BusinessIdea>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextPostId = 1;

  // Authorization State and Mixin
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Posts
  public shared ({ caller }) func createPost(title : Text, body : Text, category : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create posts");
    };
    let postId = nextPostId;
    let post : Post = {
      title;
      body;
      author = caller;
      category;
      upvotes = 0;
      createdAt = Time.now();
    };
    posts.add(postId, post);
    nextPostId += 1;
    postId;
  };

  public shared ({ caller }) func upvotePost(postId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upvote posts");
    };
    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) {
        let updatedPost : Post = {
          title = post.title;
          body = post.body;
          author = post.author;
          category = post.category;
          upvotes = post.upvotes + 1;
          createdAt = post.createdAt;
        };
        posts.add(postId, updatedPost);
      };
    };
  };

  public query ({ caller }) func getAllPosts() : async [Post] {
    posts.values().toArray().sort();
  };

  public query ({ caller }) func getPostsByCategory(category : Text) : async [Post] {
    posts.values().toArray().filter(func(post) { post.category == category }).sort();
  };

  public query ({ caller }) func getTopPosts() : async [Post] {
    posts.values().toArray().sort(Post.compareByUpvotes);
  };

  // Goals
  public shared ({ caller }) func createGoal(title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create goals");
    };
    let goal : Goal = {
      title;
      createdAt = Time.now();
      progress = 0;
      owner = caller;
    };
    let userGoals = switch (goals.get(caller)) {
      case (null) { List.empty<Goal>() };
      case (?existingGoals) { existingGoals };
    };
    userGoals.add(goal);
    goals.add(caller, userGoals);
  };

  public query ({ caller }) func getCallerGoals() : async [Goal] {
    switch (goals.get(caller)) {
      case (null) { [] };
      case (?userGoals) { userGoals.toArray().sort() };
    };
  };

  public shared ({ caller }) func updateGoalProgress(goalTitle : Text, progress : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update goals");
    };
    switch (goals.get(caller)) {
      case (null) { Runtime.trap("Goal not found") };
      case (?userGoals) {
        let userGoalsArray = userGoals.toArray();
        let updatedGoals = userGoalsArray.map(
          func(goal) {
            if (goal.title == goalTitle) {
              { title = goal.title; createdAt = goal.createdAt; progress; owner = caller };
            } else {
              goal;
            };
          }
        );
        goals.add(caller, List.fromArray<Goal>(updatedGoals));
      };
    };
  };

  // Tasks
  public shared ({ caller }) func createTask(title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create tasks");
    };
    let task : Task = {
      title;
      completed = false;
      owner = caller;
    };
    let userTasks = switch (tasks.get(caller)) {
      case (null) { List.empty<Task>() };
      case (?existingTasks) { existingTasks };
    };
    userTasks.add(task);
    tasks.add(caller, userTasks);
  };

  public query ({ caller }) func getCallerTasks() : async [Task] {
    switch (tasks.get(caller)) {
      case (null) { [] };
      case (?userTasks) { userTasks.toArray().sort() };
    };
  };

  public shared ({ caller }) func completeTask(taskTitle : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can complete tasks");
    };
    switch (tasks.get(caller)) {
      case (null) { Runtime.trap("Task not found") };
      case (?userTasks) {
        let userTasksArray = userTasks.toArray();
        let updatedTasks = userTasksArray.map(
          func(task) {
            if (task.title == taskTitle) {
              { title = task.title; completed = true; owner = caller };
            } else {
              task;
            };
          }
        );
        tasks.add(caller, List.fromArray<Task>(updatedTasks));
      };
    };
  };

  // Business Ideas
  public shared ({ caller }) func addBusinessIdea(idea : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add business ideas");
    };
    let newIdea : BusinessIdea = {
      idea;
      creator = caller;
      createdAt = Time.now();
    };
    businessIdeas.add(newIdea);
  };

  public query ({ caller }) func getAllBusinessIdeas() : async [BusinessIdea] {
    businessIdeas.toArray().sort();
  };

  public shared ({ caller }) func getRandomBusinessIdea() : async ?BusinessIdea {
    let ideasArray = businessIdeas.toArray();
    if (ideasArray.size() == 0) { return null };
    let ideasLen = ideasArray.size();
    let rand = await Random.natRange(0, ideasLen);
    ?ideasArray[rand];
  };
};
