describe("#search Shows", function () {
   
    const show =  {
        id: 1767,
        name: "The Bletchley Circle",
        summary: `<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>`,
        image: "http://static.tvmaze.com/uploads/images/original_untouched/147/369403.jpg"
      };


    it("should return show data that matches data of test show object", async function () {
        const res = await searchShows("bletchley");
        expect(res[0]).toEqual(show);
    });

    it("should return show id that matches example show id", async function () {
        const res = await searchShows("bletchley");
        expect(res[0].id).toEqual(show.id);
    });

    it("should return show id that matches example show id", async function () {
        const res = await searchShows("elementary");
        expect(res[0].id).toEqual(133);
    });

});



describe("#Populate Shows", function () {
    const show =  [{
        id: 1767,
        name: "The Bletchley Circle",
        summary: `<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>`,
        image: "http://static.tvmaze.com/uploads/images/original_untouched/147/369403.jpg"
      }];

      
    populateShows(show);
    const showListCount = document.getElementById("shows-list").childElementCount;


    it("should detect new dom element", async function () {
        expect(showListCount).toEqual(1);
    });

    $("#shows-list").empty();

});



describe("#Get Episodes", function () {

    it("should return the correct episode data based on example input", async function () {
        const episodes = await getEpisodes(1767);
        expect(episodes[0].season).toEqual(1);
    });
    it("should return the correct episode data based on example input", async function () {
        const episodes = await getEpisodes(1767);
        expect(episodes[0].number).toEqual(1);
    });

    it("should return the correct episode data based on example input", async function () {
        const episodes = await getEpisodes(1767);
        expect(episodes[0].name).toEqual("Cracking a Killer's Code, Part 1");
    });

    it("should return the correct episode data based on example input", async function () {
        const episodes = await getEpisodes(1767);
        expect(episodes[0].summary).toEqual("<p>When Susan Gray spots a hidden pattern in a series of murders, she tries to inform the police. But when they and her husband insist she forget her theory Susan enlists her wartime friends to try and track down the murderer.</p>");
    });

    it("should return the correct episode data based on example input", async function () {
        const episodes = await getEpisodes(1767);
        expect(episodes[0].airdate).toEqual("2012-09-06");
    });


    it("should return the correct episode data based on example input", async function () {
        const episodes = await getEpisodes(45795);
        expect(episodes[6].summary).toEqual(null);
    });

});


describe("#Get Cast", function () {

    it("should return the correct cast data based on example input", async function () {
        const cast = await getCast(1767);
        expect(cast[0].character.name).toEqual("Jean McBrian");
    });

    it("should return the correct cast data based on example input", async function () {
        const cast = await getCast(1767);
        expect(cast[0].person.name).toEqual("Julie Graham");
    });

    it("should return the correct cast data based on example input", async function () {
        const cast = await getCast(133);
        expect(cast[0].character.name).toEqual("Sherlock Holmes");
    });

    it("should return the correct cast data based on example input", async function () {
        const cast = await getCast(133);
        expect(cast[1].person.name).toEqual("Lucy Liu");
    });


});

