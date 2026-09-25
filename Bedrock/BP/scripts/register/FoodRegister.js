var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

import { world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";

export class FoodRegister {
    eat(args) {
        const { itemStack, source: player } = args;
        if (!itemStack || !player) return;

        const itemType = itemStack.typeId;

        switch (itemType) {
            case "mooncake_delight:golden_apple_mooncake":
                player.addEffect("absorption", 180 * 20, { amplifier: 3 });
                player.addEffect("regeneration", 30 * 20, { amplifier: 1 });
                break;
            case "mooncake_delight:enchanted_golden_apple_mooncake":
                player.addEffect("absorption", 240 * 20, { amplifier: 4 });
                player.addEffect("regeneration", 120 * 20, { amplifier: 2 });
                player.addEffect("fire_resistance", 300 * 20, { amplifier: 0 });
                player.addEffect("resistance", 300 * 20, { amplifier: 1 });
                break;
            case "mooncake_delight:salted_egg_yolk-pork_mooncake":
            case "mooncake_delight:ham_mooncake":
            case "mooncake_delight:yunnan_ham_mooncake":
            case "mooncake_delight:pork-cabbage_mooncake":
            case "mooncake_delight:ham-cabbage_mooncake":
            case "mooncake_delight:jinhua_ham_mooncake":
                player.addEffect("strength", 10 * 20, { amplifier: 0 });
                break;
            case "mooncake_delight:double_meat_mooncake":
                player.addEffect("strength", 10 * 20, { amplifier: 1 });
                break;
            case "mooncake_delight:triple_meat_mooncake":
                player.addEffect("strength", 10 * 20, { amplifier: 2 });
                break;
            case "mooncake_delight:ham-bacon_mooncake":
                player.addEffect("haste", 10 * 20, { amplifier: 1 });
                break;
            case "mooncake_delight:beef-tomato_mooncake":
                player.addEffect("regeneration", 10 * 20, { amplifier: 0 });
                break;
            case "mooncake_delight:chicken-pumpkin_mooncake":
                player.addEffect("jump_boost", 10 * 20, { amplifier: 0 });
                break;
            case "mooncake_delight:seafood_mooncake":
                player.addEffect("water_breathing", 12 * 20, { amplifier: 0 });
                break;
            case "mooncake_delight:three_delicacies_mooncake":
                player.addEffect("strength", 20 * 20, { amplifier: 1 });
                player.addEffect("resistance", 20 * 20, { amplifier: 0 });
                break;
            case "mooncake_delight:family_feasts_mooncake":
                player.addEffect("strength", 30 * 20, { amplifier: 1 });
                player.addEffect("resistance", 30 * 20, { amplifier: 0 });
                player.addEffect("speed", 30 * 20, { amplifier: 1 });
                break;
            case "mooncake_delight:black_sesame_paste_mooncake":
            case "mooncake_delight:black_sesame_lava_mooncake":
            case "mooncake_delight:black_sesame_soy_milk_mooncake":
                player.addEffect("regeneration", 90 * 20, { amplifier: 1 });
                break;
            case "mooncake_delight:bacon-onion_mooncake":
                player.addEffect("strength", 10 * 20, { amplifier: 0 });
                if (Math.random() < 0.80) {
                    player.addEffect("nausea", 4 * 20, { amplifier: 0 });
                }
                break;
            case "mooncake_delight:rotten_flesh_mooncake":
                player.addEffect("hunger", 15 * 20, { amplifier: 4 });
                break;
            case "mooncake_delight:black_sesame":
                player.addEffect("regeneration", 30 * 20, { amplifier: 1 });
                if (Math.random() < 0.25) {
                    player.addEffect("regeneration", 45 * 20, { amplifier: 3 });
                }
                if (Math.random() < 0.05) {
                    player.addEffect("regeneration", 60 * 20, { amplifier: 4 });
                }
                break;
            case "mooncake_delight:mooncake_crust_dough":
            case "mooncake_delight:snow_skin_mooncake_crust_dough":
                player.addEffect("hunger", 5 * 20, { amplifier: 0 });
                break;
        }
    }

    eatTeleportFood(args) {
        const { itemStack, source: player } = args;
        if (itemStack?.typeId !== "mooncake_delight:chorus_fruit_mooncake") return;

        const dimension = player.dimension;
        const startLocation = { x: player.location.x, y: player.location.y, z: player.location.z };

        const isPassable = (block) => {
            if (!block || block.isAir) return true;
            const typeId = block.typeId;
            if (block.isLiquid || /water|lava|sea|kelp|coral/.test(typeId)) return false;
            return /sapling|mushroom|plant|vine|fern|bush|torch|lantern|carpet|snow|button|lever|rail|redstone|flower|rose|tulip|orchid|grass/.test(typeId) && !/_block|_path|pot|chorus/.test(typeId);
        };

        const spawnBodyFX = (loc) => {
            dimension.playSound("mob.endermen.portal", loc);
            for (let j = 0; j < 20; j++) {
                dimension.spawnParticle("minecraft:basic_portal_particle", {
                    x: loc.x + (Math.random() - 0.5),
                    y: loc.y + (Math.random() * 2),
                    z: loc.z + (Math.random() - 0.5)
                });
            }
        };

        const spawnTrail = (start, end) => {
            const dx = end.x - start.x, dy = end.y - start.y, dz = end.z - start.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const steps = Math.floor(distance * 3);
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const lx = start.x + dx * t;
                const ly = start.y + dy * t;
                const lz = start.z + dz * t;
                for (let k = 0; k < 2; k++) {
                    dimension.spawnParticle("minecraft:basic_portal_particle", {
                        x: lx + (Math.random() - 0.5) * 0.3,
                        y: ly + (Math.random() * 2),
                        z: lz + (Math.random() - 0.5) * 0.3
                    });
                }
            }
        };

        for (let i = 0; i < 1000; i++) {
            const targetX = Math.floor(startLocation.x + Math.random() * 17 - 8);
            const targetY = Math.floor(startLocation.y + Math.random() * 17 - 8);
            const targetZ = Math.floor(startLocation.z + Math.random() * 17 - 8);
            if (targetY < -64 || targetY > 319) continue;

            const blockBelow = dimension.getBlock({ x: targetX, y: targetY - 1, z: targetZ });
            const blockFeet = dimension.getBlock({ x: targetX, y: targetY, z: targetZ });
            const blockHead = dimension.getBlock({ x: targetX, y: targetY + 1, z: targetZ });
            if (!blockBelow || !blockFeet || !blockHead) continue;

            const isWater = (b) => b.isLiquid || /water|sea|kelp|coral/.test(b.typeId);
            const isSolid = (b) => !b.isAir && !isPassable(b) && !isWater(b) && !/lava|fire|magma/.test(b.typeId);

            if (isSolid(blockBelow) && isPassable(blockFeet) && isPassable(blockHead) && !isWater(blockFeet)) {
                const offset = /(wall|fence|gate)/.test(blockBelow.typeId) ? 0.5 : 0.06;
                const targetLocation = { x: targetX + 0.5, y: targetY + offset, z: targetZ + 0.5 };

                spawnBodyFX(startLocation);
                spawnTrail(startLocation, targetLocation);
                player.teleport(targetLocation, { checkForBlocks: false, keepVelocity: false });
                spawnBodyFX(targetLocation);
                return;
            }
        }
    }
}

__decorate([
    EventAPI.register(world.afterEvents.itemCompleteUse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FoodRegister.prototype, "eat", null);

__decorate([
    EventAPI.register(world.afterEvents.itemCompleteUse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FoodRegister.prototype, "eatTeleportFood", null);