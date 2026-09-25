var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

import { EquipmentSlot, PlayerBreakBlockAfterEvent, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";
import { hasLimitedMaterials } from "../lib/EntityUtil";

function getEnchantmentLevel(itemStack, enchantId) {
    if (!itemStack) return 0;
    try {
        const enchantable = itemStack.getComponent("minecraft:enchantable") ?? itemStack.getComponent("enchantable");
        if (enchantable) {
            return enchantable.getEnchantment(enchantId)?.level ?? 0;
        }
    } catch (e) { }
    try {
        const enchantments = itemStack.getComponent("minecraft:enchantments") ?? itemStack.getComponent("enchantments");
        if (enchantments) {
            return enchantments.enchantments.getEnchantment(enchantId)?.level ?? 0;
        }
    } catch (e) { }
    return 0;
}

function getFortuneChance(fortune) {
    if (fortune >= 3) return 0.10;
    if (fortune === 2) return 0.055;
    if (fortune === 1) return 0.033;
    return 0.025;
}

export class PlantLootRegister {
    onPlayerBreakBlock(event) {
        const { block, brokenBlockPermutation, player } = event;
        if (!player || !brokenBlockPermutation) return;
        if (!hasLimitedMaterials(player)) return;

        const brokenId = brokenBlockPermutation.type.id;
        const equip = player.getComponent("minecraft:equippable") ?? player.getComponent("equippable");
        const mainhand = equip?.getEquipment(EquipmentSlot.Mainhand);

        if (brokenId === "minecraft:short_grass" || brokenId === "minecraft:tall_grass") {
            if (Math.random() < 0.05) {
                ItemAPI.spawn(block, "mooncake_delight:white_sesame", 1);
            }
            return;
        }

        const hasSilkTouch = getEnchantmentLevel(mainhand, "silk_touch") > 0;
        if (hasSilkTouch) return;

        const fortune = getEnchantmentLevel(mainhand, "fortune");
        const chance = getFortuneChance(fortune);

        if (brokenId === "minecraft:waterlily") {
            if (Math.random() < chance) {
                const count = Math.floor(Math.random() * 2) + 1;
                ItemAPI.spawn(block, "mooncake_delight:lotus_seed", count);
            }
            return;
        }

        if (brokenId === "minecraft:podzol") {
            if (Math.random() < chance) {
                const count = Math.floor(Math.random() * 2) + 1;
                ItemAPI.spawn(block, "mooncake_delight:truffle", count);
            }
            return;
        }
    }
}

__decorate([
    EventAPI.register(world.afterEvents.playerBreakBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerBreakBlockAfterEvent]),
    __metadata("design:returntype", void 0)
], PlantLootRegister.prototype, "onPlayerBreakBlock", null);