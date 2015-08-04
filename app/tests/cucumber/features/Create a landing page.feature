Feature: Create a Landing Page

  As an author
  I want to create a landing page
  So that I can entice people to purchase my content

  @dev
  Scenario: Author landing page with markdown
    Given I created a landing page
    When  a visitor navigates to the page
    Then  they see the cover image from "/cover.jpg"
    And   they see the tag-line "Learn how to do something"