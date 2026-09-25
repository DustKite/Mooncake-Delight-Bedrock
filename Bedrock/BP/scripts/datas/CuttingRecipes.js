export const CuttingBoardRecipes = [
    {
        ingredients: {
            item: "minecraft:wheat"
        },
        result: [
            {
                item: "mooncake_delight:flour",
                count: 1
            },
            {
                item: "mooncake_delight:flour",
                count: 1,
                chance: 0.5
            },
            {
                item: "mooncake_delight:flour",
                count: 2,
                chance: 0.25
            }
        ],
        tool: {
            item: "minecraft:anvil"
        },
        is_block_type: false,
        sound: "random.anvil_use"
    },
    {
        ingredients: {
            item: "minecraft:wheat"
        },
        result: [
            {
                item: "mooncake_delight:flour",
                count: 1
            },
            {
                item: "mooncake_delight:flour",
                count: 1,
                chance: 0.25
            }
        ],
        tool: {
            item: "minecraft:chipped_anvil"
        },
        is_block_type: false,
        sound: "random.anvil_use"
    },
    {
        ingredients: {
            item: "minecraft:wheat"
        },
        result: [
            {
                item: "mooncake_delight:flour",
                count: 1
            }
        ],
        tool: {
            item: "minecraft:damaged_anvil"
        },
        is_block_type: false,
        sound: "random.anvil_use"
    }
];