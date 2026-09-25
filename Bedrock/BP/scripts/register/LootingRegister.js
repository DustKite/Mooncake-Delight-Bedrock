var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

import { EntityDamageCause, EntityDieAfterEvent, EntityHitEntityAfterEvent, EquipmentSlot, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";
import { RandomAPI } from "../lib/RandomAPI";

const TALLOW_ANIMALS = new Set([
    "minecraft:pig",
    "minecraft:cow",
    "minecraft:sheep",
    "minecraft:goat"
]);

export class LootingRegister {
    onEntityHitEntity(event) {
        const { damagingEntity: player, hitEntity: target } = event;
        if (!player || !target || player.typeId !== "minecraft:player") return;

        const equip = player.getComponent("minecraft:equippable") ?? player.getComponent("equippable");
        const mainhand = equip?.getEquipment(EquipmentSlot.Mainhand);

        if (mainhand?.typeId === "mooncake_delight:oiled_knife" || mainhand?.hasTag?.("mooncake_delight:is_oiled_knife")) {
            try {
                target.setOnFire(15, true);
            } catch (e) { }
        }
    }

    onEntityDie(event) {
        const { deadEntity, damageSource } = event;
        if (!deadEntity) return;

        const typeId = deadEntity.typeId;

        if (typeId === "minecraft:ender_dragon") {
            if (RandomAPI.probability(25)) {
                ItemAPI.spawn(deadEntity, "mooncake_delight:enchanted_golden_apple_mooncake", 1);
            }
            return;
        }

        if (!TALLOW_ANIMALS.has(typeId)) return;

        let isOnFire = false;
        try {
            const onFireComp = deadEntity.getComponent("minecraft:onfire") ?? deadEntity.getComponent("onfire");
            if (onFireComp) isOnFire = true;
        } catch (e) { }

        const cause = damageSource?.cause;
        if (
            cause === EntityDamageCause.fire ||
            cause === EntityDamageCause.fireTick ||
            cause === EntityDamageCause.lava
        ) {
            isOnFire = true;
        }

        if (!isOnFire) return;

        const killer = damageSource?.damagingEntity;
        let isOiledKnife = false;

        if (killer && killer.typeId === "minecraft:player") {
            const equip = killer.getComponent("minecraft:equippable") ?? killer.getComponent("equippable");
            const mainhand = equip?.getEquipment(EquipmentSlot.Mainhand);
            if (mainhand?.typeId === "mooncake_delight:oiled_knife" || mainhand?.hasTag?.("mooncake_delight:is_oiled_knife")) {
                isOiledKnife = true;
            }
        }

        if (isOiledKnife) {
            if (RandomAPI.probability(25)) {
                ItemAPI.spawn(deadEntity, "mooncake_delight:tallow", 1);
            }
            if (RandomAPI.probability(75)) {
                const count = Math.floor(Math.random() * 3) + 1;
                ItemAPI.spawn(deadEntity, "mooncake_delight:tallow_crumbs", count);
            }
        } else {
            if (RandomAPI.probability(50)) {
                const count = Math.floor(Math.random() * 2) + 1;
                ItemAPI.spawn(deadEntity, "mooncake_delight:tallow_crumbs", count);
            }
        }
    }
}

__decorate([
    EventAPI.register(world.afterEvents.entityHitEntity),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHitEntityAfterEvent]),
    __metadata("design:returntype", void 0)
], LootingRegister.prototype, "onEntityHitEntity", null);

__decorate([
    EventAPI.register(world.afterEvents.entityDie),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityDieAfterEvent]),
    __metadata("design:returntype", void 0)
], LootingRegister.prototype, "onEntityDie", null);